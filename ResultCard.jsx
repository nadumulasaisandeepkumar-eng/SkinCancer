import { Link } from 'react-router-dom';
import SeverityBadge from './SeverityBadge';
import ConfidenceBar from './ConfidenceBar';
import { MEDICAL_DISCLAIMER } from '../../utils/constants';
import Button from '../common/Button';

/**
 * ResultCard — structured display for prediction output.
 * Fully responsive: stacks image+class on mobile, scales all spacing.
 */
export default function ResultCard({ result, previewUrl, onReset }) {
  const { predictedClass, severity, confidence, description, recommendation, probabilities } = result;

  return (
    <div className="rounded-lg border border-border bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-5 py-4 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
          <span className="text-sm font-semibold text-text-primary truncate">Analysis Complete</span>
        </div>
        <SeverityBadge severity={severity} size="sm" />
      </div>

      <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
        {/* Image + class */}
        <div className="flex items-start gap-3 sm:gap-4">
          {previewUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-border overflow-hidden shrink-0 bg-surface">
              <img
                src={previewUrl}
                alt="Analyzed dermoscopic image"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wide mb-1">
              Predicted Lesion Class
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary leading-tight break-words">
              {predictedClass}
            </h2>
          </div>
        </div>

        {/* Confidence */}
        <ConfidenceBar confidence={confidence} severity={severity} />

        {/* Class Probability Breakdown */}
        {probabilities && probabilities.length > 0 && (
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
              All Class Probabilities
            </p>
            <div className="space-y-2">
              {probabilities.map(({ key, name, severity: sev, probability }) => {
                const isTop = key === probabilities[0].key;
                const pct = (probability * 100).toFixed(1);
                const barColor =
                  sev === 'Severe' ? 'bg-danger' :
                  sev === 'Moderate' ? 'bg-warning' : 'bg-success';
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`text-xs font-medium ${isTop ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {name}
                        {isTop && (
                          <span className="ml-1.5 text-[10px] font-semibold text-primary uppercase tracking-wide">Top</span>
                        )}
                      </span>
                      <span className="text-xs tabular-nums text-text-secondary">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface border border-border rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out ${isTop ? 'opacity-100' : 'opacity-50'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1.5">
              Clinical Observation
            </p>
            <p className="text-sm text-text-primary leading-relaxed">{description}</p>
          </div>
        )}

        {/* Recommendation */}
        {recommendation && (
          <div className="rounded-md border border-warning/30 bg-warning-light px-3 sm:px-4 py-3">
            <p className="text-xs font-semibold text-warning-text uppercase tracking-wide mb-1">
              Recommendation
            </p>
            <p className="text-sm text-warning-text leading-relaxed">{recommendation}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="rounded-md border border-border bg-surface px-3 sm:px-4 py-3">
          <p className="text-xs text-text-secondary leading-relaxed">{MEDICAL_DISCLAIMER}</p>
        </div>

        {/* Actions — stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button variant="outline" size="md" onClick={onReset} fullWidth>
            Try Another Prediction
          </Button>
          <Link to="/performance" className="flex-1 w-full">
            <Button variant="secondary" size="md" fullWidth>
              View Model Performance
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
