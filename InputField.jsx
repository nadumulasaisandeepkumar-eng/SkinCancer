/**
 * InputField — reusable form input with label + error state
 */
export default function InputField({
  id,
  label,
  type = 'text',
  error,
  helperText,
  className = '',
  inputClassName = '',
  required,
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        required={required}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        aria-invalid={!!error}
        className={`
          h-10 px-3 text-sm rounded border bg-white text-text-primary
          placeholder:text-text-muted
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
          ${error
            ? 'border-danger focus:ring-danger/20 focus:border-danger'
            : 'border-border hover:border-gray-300'
          }
          disabled:opacity-50 disabled:bg-surface disabled:cursor-not-allowed
          ${inputClassName}
        `}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger flex items-center gap-1">
          <ErrorIcon />
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-xs text-text-secondary">
          {helperText}
        </p>
      )}
    </div>
  );
}

function ErrorIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
