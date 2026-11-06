import { formatPercent } from '../../utils/formatters';
import { SEVERITY_LEVELS } from '../../utils/constants';

const BAR_COLORS = {
  [SEVERITY_LEVELS.MILD]: 'bg-success',
  [SEVERITY_LEVELS.MODERATE]: 'bg-warning',
  [SEVERITY_LEVELS.SEVERE]: 'bg-danger',
};

/**
 * ConfidenceBar — animated horizontal progress bar for confidence score.
 * Props: confidence (0–100), severity (for color), showLabel
 */
export default function ConfidenceBar({ confidence, severity, showLabel = true }) {
  const clampedValue = Math.max(0, Math.min(100, confidence ?? 0));
  const barColor = BAR_COLORS[severity] ?? 'bg-primary';

  return (
    <div className="flex flex-col gap-1.5">
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-text-secondary">Model Confidence</span>
          <span className="text-xs font-semibold text-text-primary tabular-nums">
            {formatPercent(clampedValue)}
          </span>
        </div>
      )}
      <div
        className="h-2 w-full bg-surface border border-border rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Model confidence: ${formatPercent(clampedValue)}`}
      >
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
