---
title: Skin Cancer EfficientNetB3
emoji: 🏥
colorFrom: blue
colorTo: indigo
sdk: gradio
sdk_version: 6.1.0
app_file: app.py
pinned: false
license: apache-2.0
short_description: Interactive dashboard for skin cancer classification
---

# 🧬 Skin Cancer EfficientNetB3 Model

This space hosts a fine-tuned **EfficientNetB3** deep learning model designed for the automated classification of dermoscopic images of skin lesions. 

![Model](https://img.shields.io/badge/Model-EfficientNetB3-blue?style=for-the-badge) 
![Framework](https://img.shields.io/badge/Framework-TensorFlow%20%2F%20Keras-orange?style=for-the-badge)
![UI](https://img.shields.io/badge/Interface-Gradio-pink?style=for-the-badge)

## 📌 Model Overview

The model takes dermoscopic images and processes them to predict the likelihood of various skin cancer classifications. It leverages the **EfficientNetB3** architecture, which is highly regarded for balancing computational efficiency with superior, state-of-the-art accuracy.

## 🛠️ Usage (Gradio Client)

This Hugging Face space exposes a Gradio API endpoint which can be seamlessly integrated into modern React/Next.js frontend applications using the `@gradio/client`.

### Example Client Integration:
```javascript
import { Client } from "@gradio/client";

const response_0 = await fetch("https://example.com/lesion.jpg");
const exampleImage = await response_0.blob();

const client = await Client.connect("katkurisanjay/Skin-Cancer-EfficientNetB3");
const result = await client.predict("/predict", { 
		img: exampleImage, 
});

console.log(result.data);
```

## 🏥 Classes Predicted

The model interprets the image and yields a probability distribution across multiple core classes. The predictions are crucial for identifying different types of carcinomas and melanomas rapidly.

- **MEL**: Melanoma
- **NV**: Melanocytic nevus
- **BCC**: Basal cell carcinoma
- **AKIEC**: Actinic keratosis
- **BKL**: Benign keratosis
- **DF**: Dermatofibroma
- **VASC**: Vascular lesion

## ⚠️ Medical Disclaimer
**For research and educational purposes only.** The AI predictions provided by this space do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified dermatologist or physician regarding a medical condition.
