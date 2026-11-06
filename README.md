<div align="center">
  <h1>🧬 Skin Cancer Detection AI</h1>
  <p>An enterprise-grade, highly responsive web application that leverages a fine-tuned EfficientNet deep learning model to analyze and predict the likelihood of skin cancer from dermoscopic images.</p>

  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" /></a>
    <a href="https://huggingface.co/"><img src="https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Spaces-blue?style=for-the-badge" alt="Hugging Face" /></a>
  </p>
</div>

<br />

## 🌟 Overview

The **Skin Cancer Detection App** bridges the gap between state-of-the-art clinical AI models and an accessible, user-friendly frontend interface. 

By integrating a powerful **EfficientNet** model hosted on **Hugging Face Spaces** (via the Gradio Client), users can upload skin lesion images and receive instant, AI-driven predictions and confidence scores to assist clinical analysis.

---

## 🎯 Key Features

- **🤖 Advanced AI Integration**: Seamless connection to a Python-based EfficientNet backend hosted on Hugging Face Spaces.
- **⚡ Blazing Fast**: Built with React 19 and Vite for instantaneous loads and a highly fluid experience.
- **📱 True Responsive Design**: Painstakingly crafted with Tailwind CSS and Framer Motion to look stunning on mobile, tablet, and desktop viewports.
- **📊 Real-time Analysis**: Interactive loading states, image previews, and rich visual output of probability classes.
- **🔒 Secure & Scalable**: Production-ready code designed to be cleanly deployed to Vercel.

---

## 🏗️ Architecture Stack

- **Frontend Framework**: React 19 + Vite
- **Styling & Animations**: Tailwind CSS + Framer Motion + Recharts
- **API & Inference**: `axios` + `@gradio/client` (Remote inference on HF Spaces)
- **Deployment**: Configured for Vercel out of the box (includes SPA routing `vercel.json`).

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Prerequisites

Make sure you have Node or similar installed:
* npm
  ```sh
  npm install npm@latest -g
  ```

### 2. Installation

1. Clone the repo
   ```sh
   git clone https://github.com/katkurisanjay/Skin-Cancer-Detection.git
   ```
2. Navigate to the project directory
   ```sh
   cd Skin-Cancer-Detection
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add any necessary backend API keys or Hugging Face Space URLs:
   ```env
   VITE_HF_API_KEY=your_hugging_face_token
   VITE_HF_SPACE_URL=your_gradio_space_name
   ```

### 3. Running Locally

Start the Vite development server:
```sh
npm run dev
```

Your app should now be running at `http://localhost:5173`.

---

## 🌐 Deployment

This project is fully optimized for continuous deployment via **Vercel**. 

1. Connect your GitHub repository to Vercel.
2. Select **Vite** as the framework preset.
3. Add your Environment Variables found in your local `.env`.
4. Deploy! The included `vercel.json` will automatically handle SPA rewrites.

---

## ⚠️ Disclaimer

**This tool is for research and educational purposes only.** It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.

<br />

