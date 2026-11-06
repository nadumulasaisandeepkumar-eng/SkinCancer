import { formatMetricAsPercent, formatDecimal } from '../../utils/formatters';

const METRIC_META = {
  accuracy: {
    label: 'Accuracy',
    description: 'Overall correct predictions',
    isPercent: true,
    decimals: 2,
    color: 'text-primary',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  precision: {
    label: 'Precision',
    description: 'True pos / predicted pos',
    isPercent: true,
    decimals: 1,
    color: 'text-success',
    bg: 'bg-success-light',
    border: 'border-success/20',
  },
  recall: {
    label: 'Recall',
    description: 'True pos / actual pos',
    isPercent: true,
    decimals: 1,
    color: 'text-success',
    bg: 'bg-success-light',
    border: 'border-success/20',
  },
  f1Score: {
    label: 'F1 Score',
    description: 'Harmonic mean: P & R',
    isPercent: true,
    decimals: 1,
    color: 'text-primary',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  validationLoss: {
    label: 'Val. Loss',
    description: 'Final validation loss',
    isPercent: false,
    decimals: 4,
    color: 'text-warning',
    bg: 'bg-warning-light',
    border: 'border-warning/20',
  },
};

/**
 * MetricCard — compact responsive card for model metrics.
 * Uses shorter description on mobile via the text.
 */
export default function MetricCard({ metricKey, value }) {
  const meta = METRIC_META[metricKey] ?? {
    label: metricKey,
    description: '',
    isPercent: false,
    color: 'text-text-primary',
    bg: 'bg-surface',
    border: 'border-border',
  };

  const displayValue = meta.isPercent
    ? formatMetricAsPercent(value, meta.decimals ?? 1)
    : formatDecimal(value, meta.decimals ?? 4);

  return (
    <div className={`rounded-lg border ${meta.border} ${meta.bg} px-4 py-4 sm:px-5`}>
      <p className="text-[10px] sm:text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2 leading-tight">
        {meta.label}
      </p>
      <p className={`text-xl sm:text-2xl font-bold tracking-tight ${meta.color} mb-1`}>
        {displayValue}
      </p>
      <p className="text-[11px] sm:text-xs text-text-secondary leading-snug">{meta.description}</p>
    </div>
  );
}
