// Variant-based Button component using a plain class map (no extra dependencies)
const BASE =
  'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-dark border border-transparent',
  secondary:
    'bg-white text-primary border border-primary hover:bg-surface',
  ghost:
    'bg-transparent text-text-secondary hover:bg-surface border border-transparent',
  danger:
    'bg-danger text-white hover:bg-red-700 border border-transparent',
  outline:
    'bg-white text-text-primary border border-border hover:bg-surface',
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded',
  md: 'h-9 px-4 text-sm rounded',
  lg: 'h-10 px-5 text-sm rounded',
  xl: 'h-11 px-6 text-base rounded',
};

/**
 * Reusable Button component.
 * Props: variant, size, fullWidth, loading, icon, children, ...rest
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon: Icon = null,
  className = '',
  disabled,
  ...rest
}) {
  const variantClass = variants[variant] ?? variants.primary;
  const sizeClass = sizes[size] ?? sizes.md;

  return (
    <button
      className={`${BASE} ${variantClass} ${sizeClass} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner className="mr-2" />
          {children}
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
}

function Spinner({ className = '' }) {
  return (
    <svg
      className={`animate-spin w-4 h-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
