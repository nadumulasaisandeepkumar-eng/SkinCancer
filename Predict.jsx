/* eslint-disable */
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import PredictionForm from '../components/prediction/PredictionForm';
import ResultCard from '../components/prediction/ResultCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { usePrediction } from '../hooks/usePrediction';

const LOADING_STEPS = [
  'Preprocessing dermoscopic image…',
  'Extracting visual features via EfficientNetB3…',
  'Fusing patient age feature…',
  'Running classification head…',
  'Generating severity assessment…',
];

function MicroscopeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  );
}

export default function Predict() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    status,
    result,
    error,
    validationErrors,
    isLoading,
    predict,
    reset,
    clearValidationError,
  } = usePrediction();

  const handleSubmit = useCallback(async (file, age) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    await predict(file, age);
  }, [predict]);

  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    reset();
  }, [previewUrl, reset]);

  return (
    <div>
      <PageHeader
        badge="Real-Time Analysis"
        title="Skin Lesion Prediction"
        subtitle="Upload a dermoscopic image and provide patient age to receive an AI-generated classification and severity assessment."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Clinical note banner */}
        <div className="mb-5 sm:mb-6 flex items-start gap-3 rounded-md border border-border bg-surface px-4 py-3">
          <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-text-secondary leading-relaxed">
            <strong className="text-text-primary font-semibold">Clinical Note:</strong>{' '}
            This tool provides AI-assisted predictions for research and educational purposes.
            Results must be reviewed by a qualified medical professional before clinical action is taken.
          </p>
        </div>

        {/* Two-column layout — stacks on mobile/tablet, side-by-side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 items-start">

          {/* ── Left: Input form ──────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-white shadow-card p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 sm:mb-5 pb-4 border-b border-border">
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">Patient Input</h2>
                  <p className="text-xs text-text-secondary mt-0.5">Provide image and age for analysis</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                  <MicroscopeIcon className="w-4 h-4 text-primary" />
                </div>
              </div>

              <PredictionForm
                onSubmit={handleSubmit}
                onReset={handleReset}
                validationErrors={validationErrors}
                onClearError={clearValidationError}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* ── Right: Result / state panel ───────────────── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg border border-border bg-white shadow-card"
                >
                  <EmptyState
                    icon={MicroscopeIcon}
                    title="Awaiting Input"
                    description="Upload a dermoscopic image and enter patient age, then click Run Prediction to begin analysis."
                  />
                  {/* Submission guidelines */}
                  <div className="border-t border-border px-4 sm:px-6 py-4 sm:py-5">
                    <p className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-3">
                      Submission Guidelines
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Use high-quality dermoscopic images for best accuracy',
                        'Ensure the lesion is centered and in focus',
                        'Accepted formats: JPG, PNG, WebP (max 10MB)',
                        'Provide accurate patient age for improved classification',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {status === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg border border-border bg-white shadow-card"
                >
                  <LoadingState message="Analyzing skin lesion…" steps={LOADING_STEPS} />
                </motion.div>
              )}

              {status === 'success' && result && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResultCard result={result} previewUrl={previewUrl} onReset={handleReset} />
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg border border-border bg-white shadow-card"
                >
                  <ErrorState title="Prediction Failed" message={error} onRetry={handleReset} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
