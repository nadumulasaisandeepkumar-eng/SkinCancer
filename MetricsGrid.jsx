import MetricCard from './MetricCard';

const METRIC_KEYS = ['accuracy', 'precision', 'recall', 'f1Score', 'validationLoss'];

/**
 * MetricsGrid — renders all five key metric cards in a responsive grid.
 * Props: metrics (normalized metrics object from predictionService)
 */
export default function MetricsGrid({ metrics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {METRIC_KEYS.map((key) => (
        <MetricCard key={key} metricKey={key} value={metrics[key]} />
      ))}
    </div>
  );
}
