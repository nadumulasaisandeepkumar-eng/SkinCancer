import { useState, useCallback } from 'react';
import { submitPrediction } from '../services/predictionService';
import { validatePredictionInputs } from '../utils/validators';

const INITIAL_STATE = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  result: null,
  error: null,
};

/**
 * Custom hook encapsulating the full prediction workflow.
 *
 * Responsibilities:
 * - Owns prediction lifecycle state (idle/loading/success/error)
 * - Validates inputs before submission
 * - Calls the service layer (never axios directly)
 * - Exposes clean, stable callbacks to the UI
 *
 * Usage:
 *   const { status, result, error, validationErrors, predict, reset } = usePrediction();
 */
export function usePrediction() {
  const [prediction, setPrediction] = useState(INITIAL_STATE);
  const [validationErrors, setValidationErrors] = useState({});

  const predict = useCallback(async (imageFile, age) => {
    // Validate before any API call
    const { valid, errors } = validatePredictionInputs(imageFile, age);

    if (!valid) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setPrediction({ status: 'loading', result: null, error: null });

    try {
      const result = await submitPrediction(imageFile, Number(age));
      setPrediction({ status: 'success', result, error: null });
    } catch (err) {
      const message =
        err?.message ||
        'Prediction failed. Please check your connection and try again.';
      setPrediction({ status: 'error', result: null, error: message });
    }
  }, []);

  const reset = useCallback(() => {
    setPrediction(INITIAL_STATE);
    setValidationErrors({});
  }, []);

  const clearValidationError = useCallback((field) => {
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return {
    status: prediction.status,
    result: prediction.result,
    error: prediction.error,
    validationErrors,
    isIdle: prediction.status === 'idle',
    isLoading: prediction.status === 'loading',
    isSuccess: prediction.status === 'success',
    isError: prediction.status === 'error',
    predict,
    reset,
    clearValidationError,
  };
}
