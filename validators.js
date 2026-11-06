import { ACCEPTED_IMAGE_TYPES, VALIDATION } from './constants';

/**
 * Validates an image file for type and size constraints.
 * Returns { valid: boolean, error: string | null }
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No image selected.' };
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPG, PNG, or WebP image.',
    };
  }
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > VALIDATION.MAX_FILE_SIZE_MB) {
    return {
      valid: false,
      error: `File size exceeds ${VALIDATION.MAX_FILE_SIZE_MB}MB limit.`,
    };
  }
  return { valid: true, error: null };
}

/**
 * Validates patient age input.
 * Returns { valid: boolean, error: string | null }
 */
export function validateAge(age) {
  if (age === '' || age === null || age === undefined) {
    return { valid: false, error: 'Patient age is required.' };
  }
  const parsed = Number(age);
  if (isNaN(parsed) || !Number.isInteger(parsed)) {
    return { valid: false, error: 'Age must be a whole number.' };
  }
  if (parsed < VALIDATION.AGE_MIN) {
    return { valid: false, error: 'Age must be at least 1.' };
  }
  if (parsed > VALIDATION.AGE_MAX) {
    return {
      valid: false,
      error: `Age cannot exceed ${VALIDATION.AGE_MAX}. Please verify patient details.`,
    };
  }
  return { valid: true, error: null };
}

/**
 * Runs all prediction input validations.
 * Returns { valid: boolean, errors: { image?: string, age?: string } }
 */
export function validatePredictionInputs(file, age) {
  const imageResult = validateImageFile(file);
  const ageResult = validateAge(age);

  const errors = {};
  if (!imageResult.valid) errors.image = imageResult.error;
  if (!ageResult.valid) errors.age = ageResult.error;

  return {
    valid: imageResult.valid && ageResult.valid,
    errors,
  };
}
