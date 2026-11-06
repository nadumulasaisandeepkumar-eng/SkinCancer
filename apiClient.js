import axios from 'axios';
import env from '../config/env';

/**
 * Central Axios instance.
 * All API communication goes through this client.
 *
 * TO CONNECT TO HUGGING FACE SPACE:
 *   1. Create a Hugging Face Space with your Gradio app (app.py & model).
 *   2. Set VITE_API_BASE_URL in .env to your Space URL (e.g. https://your-username-your-space.hf.space)
 *   3. Set VITE_ENABLE_MOCK_API=false in .env
 */
const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 60000, // 60s — accounts for model inference time
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor — attach auth headers here when needed
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Attach Authorization token here when auth is implemented
    // const token = getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize API errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or server unreachable
      return Promise.reject({
        type: 'NETWORK_ERROR',
        message:
          'Unable to reach the prediction server. Please verify the server is running.',
      });
    }

    const { status, data } = error.response;

    if (status === 422) {
      return Promise.reject({
        type: 'VALIDATION_ERROR',
        message: data?.detail || 'Invalid input. Please check the uploaded image and age.',
      });
    }

    if (status >= 500) {
      return Promise.reject({
        type: 'SERVER_ERROR',
        message: 'A server error occurred. Please try again shortly.',
      });
    }

    return Promise.reject({
      type: 'API_ERROR',
      message: data?.message || 'An unexpected error occurred.',
    });
  }
);

export default apiClient;
