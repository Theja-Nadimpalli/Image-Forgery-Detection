from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from ela import convert_to_ela_image

# ===== ADDED =====
# Import model prediction function
from predict import predict_image

import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
RESULT_FOLDER = "results"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)


@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({
            "message": "No image received"
        }), 400

    image = request.files["image"]

    original_filename = image.filename

    original_path = os.path.join(
        UPLOAD_FOLDER,
        original_filename
    )

    image.save(original_path)

    # Generate ELA image
    ela_image = convert_to_ela_image(original_path)


    ela_image_resized = ela_image.resize((224, 224))

    ela_filename = f"ela_{original_filename}"

    ela_path = os.path.join(
        RESULT_FOLDER,
        ela_filename
    )

    # Save resized ELA image instead of original ELA image
    ela_image_resized.save(ela_path)

    # Run model prediction
    label, confidence = predict_image(
        ela_image_resized
    )

    return jsonify({

        "prediction": label,
        "confidence": round(confidence, 2),

        "original_image":
            f"http://localhost:5000/uploads/{original_filename}",

        "ela_image":
            f"http://localhost:5000/results/{ela_filename}"
    })


@app.route("/uploads/<filename>")
def serve_original_image(filename):
    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )


@app.route("/results/<filename>")
def serve_ela_image(filename):
    return send_from_directory(
        RESULT_FOLDER,
        filename
    )


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )

#.venv\Scripts\activate