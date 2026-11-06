/**
 * Application-wide constants.
 * Centralizes magic strings, labels, and validation thresholds.
 */

export const APP = {
  NAME: 'DermAI Clinical',
  TAGLINE: 'AI-Assisted Skin Lesion Screening',
  VERSION: '1.0.0',
};

export const LESION_CLASSES = [
  'Melanoma',
  'Melanocytic Nevi',
  'Basal Cell Carcinoma',
  'Actinic Keratosis',
  'Benign Keratosis',
  'Dermatofibroma',
  'Vascular Lesions',
];

export const SEVERITY_LEVELS = {
  MILD: 'Mild',
  MODERATE: 'Moderate',
  SEVERE: 'Severe',
};

export const SEVERITY_COLORS = {
  [SEVERITY_LEVELS.MILD]: 'success',
  [SEVERITY_LEVELS.MODERATE]: 'warning',
  [SEVERITY_LEVELS.SEVERE]: 'danger',
};

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ACCEPTED_IMAGE_EXTENSIONS = '.jpg, .jpeg, .png, .webp';

export const VALIDATION = {
  AGE_MIN: 1,
  AGE_MAX: 110,
  MAX_FILE_SIZE_MB: 10,
};

export const MEDICAL_DISCLAIMER =
  'This system is an AI-assisted screening tool and should not be considered a final medical diagnosis. Please consult a qualified dermatologist for clinical confirmation.';

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Predict', to: '/predict' },
  { label: 'Performance', to: '/performance' },
  { label: 'About', to: '/about' },
];
