/**
 * LoadingState — premium loading indicator for async operations.
 * Props: message (optional stage label), steps (array of stage strings)
 */
export default function LoadingState({ message = 'Processing…', steps = [] }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
      <div className="relative mb-6">
        {/* Outer ring */}
        <svg
          className="w-14 h-14 animate-spin text-primary/20"
          viewBox="0 0 56 56"
          fill="none"
        >
          <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" />
        </svg>
        {/* Inner spinner */}
        <svg
          className="w-14 h-14 animate-spin absolute inset-0 text-primary"
          style={{ animationDuration: '0.85s' }}
          viewBox="0 0 56 56"
          fill="none"
        >
          <path
            d="M28 4a24 24 0 0124 24"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-text-primary">{message}</p>
      {steps.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-text-secondary"
            >
              <span className="w-1 h-1 rounded-full bg-primary/40 inline-block" />
              {step}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
