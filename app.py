import gradio as gr
import tensorflow as tf
import numpy as np
import json
from PIL import Image

# =========================================================
# CONFIG
# =========================================================
MODEL_PATH = "best_efficientnet.keras"
CLASS_PATH = "class_names.json"
IMG_SIZE = (300, 300)

# =========================================================
# LOAD MODEL & CLASSES
# =========================================================
model = tf.keras.models.load_model(MODEL_PATH)

with open(CLASS_PATH, "r") as f:
    class_names = json.load(f)

# =========================================================
# PREPROCESS
# =========================================================
def preprocess(image: Image.Image):
    image = image.resize(IMG_SIZE)
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)

# =========================================================
# PREDICTION FUNCTION (API CORE)
# =========================================================
def predict(image):
    x = preprocess(image)
    probs = model.predict(x)[0]

    sorted_idx = probs.argsort()[::-1]

    return {
        "predicted_class": class_names[sorted_idx[0]],
        "confidence": float(probs[sorted_idx[0]]),
        "probabilities": {
            class_names[i]: float(probs[i]) for i in range(len(class_names))
        }
    }

# =========================================================
# GRADIO INTERFACE
# =========================================================
demo = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil", label="Upload Skin Lesion Image"),
    outputs=gr.JSON(label="Prediction Result"),
    title="🩺 Skin Cancer Classification API",
    description="""
    EfficientNetB3 model trained on HAM10000 dataset.
    
    ⚠️ This tool is for educational and research purposes only.
    """
)

if __name__ == "__main__":
    demo.launch()