/**
 * Centralized environment configuration.
 * All access to import.meta.env must go through this module.
 * Do NOT import import.meta.env anywhere else in the codebase.
 */

const env = {
  /**
   * Base URL for the backend API.
   * When your friend delivers the Flask/FastAPI server, update .env:
   *   VITE_API_BASE_URL=http://<server-ip>:<port>/api
   */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  /**
   * Application display name
   */
  APP_NAME: import.meta.env.VITE_APP_NAME || 'DermAI Clinical',

  /**
   * When true, all API calls use mock data defined in src/data/
   * Set VITE_ENABLE_MOCK_API=false in .env to switch to real backend
   */
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === 'true',

  /**
   * Convenience flag for development environment
   */
  IS_DEV: import.meta.env.DEV,
};

export default env;
