
import io
import base64

import numpy as np
from PIL import Image, ImageChops, ImageEnhance
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow import keras

# ---------------- config ----------------
DATA_DIR = "data"  # folder containing the .keras files
BASELINE_MODEL_PATH = f"{DATA_DIR}/final_image_forgery_detector.keras"
TWO_STREAM_MODEL_PATH = f"{DATA_DIR}/two_stream_forgery_detector.keras"
LOCALIZER_MODEL_PATH = f"{DATA_DIR}/forgery_localizer_unet.keras"

USE_TWO_STREAM = False  

IMG_SIZE = (224, 224)
SEG_SIZE = 256
ELA_QUALITY = 90
STD_QUALITY = 95
THRESHOLD = 0.5

# --- decision fusion (NEW) ---
UNCERTAIN_LOW = 0.40    
UNCERTAIN_HIGH = 0.60  
AREA_TIEBREAK_PCT = 15.0  
                          

app = Flask(__name__)
CORS(app)  # lets your Vite frontend (port 5173) call this API
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


print("Loading models ...")
detector = keras.models.load_model(
    TWO_STREAM_MODEL_PATH if USE_TWO_STREAM else BASELINE_MODEL_PATH
)
localizer = keras.models.load_model(LOCALIZER_MODEL_PATH, compile=False)
print(f"Models ready (detector: {'two-stream' if USE_TWO_STREAM else 'baseline'}).")


def standardize(pil_img):
    buf = io.BytesIO()
    pil_img.convert("RGB").save(buf, format="JPEG", quality=STD_QUALITY)
    buf.seek(0)
    return Image.open(buf).convert("RGB")


def convert_pil_to_ela(image, quality=ELA_QUALITY):
    image = image.convert("RGB")
    buf = io.BytesIO()
    image.save(buf, format="JPEG", quality=quality)
    buf.seek(0)
    ela = ImageChops.difference(image, Image.open(buf))
    max_diff = max(ex[1] for ex in ela.getextrema()) or 1
    return ImageEnhance.Brightness(ela).enhance(255.0 / max_diff)


def png_base64(pil_img):
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()


def detect(std, ela_full):
    """Return p(forged) using whichever detector is configured."""
    ela224 = ela_full.resize(IMG_SIZE)
    if USE_TWO_STREAM:
        rgb = np.expand_dims(np.asarray(std.resize(IMG_SIZE), np.float32), 0)   # 0-255
        ela = np.expand_dims(np.asarray(ela224, np.float32), 0)                 # 0-255
        return float(detector.predict([rgb, ela], verbose=0)[0, 0])
    ela = np.expand_dims(np.asarray(ela224, np.float32) / 255.0, 0)             # 0-1
    return float(detector.predict(ela, verbose=0)[0, 0])


# ---------------- routes ----------------
@app.route("/health")
def health():
    return jsonify(status="ok", detector="two-stream" if USE_TWO_STREAM else "baseline")


@app.route("/predict", methods=["POST"])
@app.route("/api/analyze", methods=["POST"])
def analyze():
    if "image" not in request.files:
        return jsonify(error="Send multipart/form-data with an 'image' file field."), 400
    try:
        original = Image.open(request.files["image"].stream).convert("RGB")
    except Exception:
        return jsonify(error="The uploaded file is not a valid image."), 400

    std = standardize(original)
    ela_full = convert_pil_to_ela(std)

    # ---- Stage 1: classifier score ----
    p_forged = detect(std, ela_full)

    # ---- Stage 2: localizer mask ----
    x_seg = np.expand_dims(
        np.asarray(std.resize((SEG_SIZE, SEG_SIZE)), np.float32), 0
    )
    mask = localizer.predict(x_seg, verbose=0)[0, :, :, 0]  

 
    tampered_pct = float((mask > 0.5).mean() * 100)

    prediction = "forged" if p_forged > THRESHOLD else "authentic"  # classifier alone

    if UNCERTAIN_LOW <= p_forged <= UNCERTAIN_HIGH:
        # classifier is unsure -> the localized area size decides
        verdict = "forged" if tampered_pct > AREA_TIEBREAK_PCT else "authentic"
        decision_basis = "area_tiebreak"
    else:
        verdict = prediction
        decision_basis = "classifier"

    # ---- response images at original resolution ----
    mask_img = Image.fromarray((mask * 255).astype(np.uint8)).resize(original.size)
    red = Image.new("RGB", original.size, (255, 0, 0))
    overlay = Image.composite(
        Image.blend(original, red, 0.5),
        original,
        mask_img.point(lambda v: 255 if v > 127 else 0),
    )

    return jsonify(
        prediction=prediction,
        verdict=verdict,
        decision_basis=decision_basis,
        confidence=round((p_forged if prediction == "forged" else 1 - p_forged) * 100, 2),
        p_forged=round(p_forged, 4),
        threshold=THRESHOLD,
        tampered_area_percent=round(tampered_pct, 2),
        ela_png_base64=png_base64(ela_full),
        mask_png_base64=png_base64(mask_img),
        overlay_png_base64=png_base64(overlay),
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)

# python -m venv venv
# venv\Scripts\activate
# pip install -r requirements.txt