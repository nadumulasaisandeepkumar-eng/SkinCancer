import { SEVERITY_LEVELS } from '../../utils/constants';

const CONFIGS = {
  [SEVERITY_LEVELS.MILD]: {
    label: 'Mild',
    className: 'bg-success-light text-success-text border border-success/20',
    dot: 'bg-success',
  },
  [SEVERITY_LEVELS.MODERATE]: {
    label: 'Moderate',
    className: 'bg-warning-light text-warning-text border border-warning/20',
    dot: 'bg-warning',
  },
  [SEVERITY_LEVELS.SEVERE]: {
    label: 'Severe',
    className: 'bg-danger-light text-danger-text border border-danger/20',
    dot: 'bg-danger',
  },
};

const DEFAULT_CONFIG = {
  label: 'Unknown',
  className: 'bg-surface text-text-secondary border border-border',
  dot: 'bg-text-muted',
};

/**
 * SeverityBadge — displays color-coded severity level.
 * Props: severity ('Mild' | 'Moderate' | 'Severe'), size ('sm' | 'md')
 */
export default function SeverityBadge({ severity, size = 'md' }) {
  const config = CONFIGS[severity] ?? DEFAULT_CONFIG;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded px-2.5 py-1 ${config.className} ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
