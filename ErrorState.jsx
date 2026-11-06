/**
 * ErrorState — displays API or validation errors gracefully.
 */
export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-12 h-12 rounded-lg bg-danger/5 border border-danger/20 flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-danger"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{title}</h3>
      {message && (
        <p className="text-sm text-text-secondary max-w-sm">{message}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 text-sm font-medium text-primary hover:text-primary-dark underline-offset-4 hover:underline transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
