from tensorflow.keras.models import load_model
import numpy as np

print("Loading Model...")

model = load_model(
    "model/final_image_forgery_detector.keras"
)

print("Model Loaded Successfully")


def predict_image(ela_image):

    img = np.array(ela_image) / 255.0

    img = np.expand_dims(
        img,
        axis=0
    )

    prediction = model.predict(img)[0][0]

    if prediction > 0.5:
        label = "Forged"
    else:
        label = "Authentic"

    confidence = float(
        max(prediction, 1 - prediction) * 100
    )

    return label, confidence