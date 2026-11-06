import { useRef, useState, useCallback } from 'react';
import { ACCEPTED_IMAGE_EXTENSIONS, VALIDATION } from '../../utils/constants';
import { validateImageFile } from '../../utils/validators';

/**
 * UploadDropzone — drag-and-drop + browse file upload.
 * Responsive: optimised for touch on mobile, drag on desktop.
 */
export default function UploadDropzone({ onFileSelected, error, disabled }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      setLocalError(null);
      const { valid, error: validationError } = validateImageFile(file);
      if (!valid) {
        setLocalError(validationError);
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const onDragOver = (e) => { e.preventDefault(); if (!disabled) setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const displayError = localError || error;

  return (
    <div className="flex flex-col gap-2">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload dermoscopic image. Tap or click to browse files."
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) inputRef.current?.click(); }}
        className={`
          relative flex flex-col items-center justify-center
          min-h-[140px] sm:min-h-[160px] rounded-lg border-2 border-dashed
          cursor-pointer transition-colors duration-150 px-4 sm:px-6 py-6 sm:py-8
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          ${disabled ? 'opacity-50 cursor-not-allowed bg-surface border-border' : ''}
          ${!disabled && isDragging
            ? 'border-primary bg-blue-50'
            : !disabled
            ? displayError
              ? 'border-danger/40 bg-danger/[0.02] hover:border-danger/60'
              : 'border-border bg-white hover:border-gray-300 hover:bg-surface'
            : ''
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_EXTENSIONS}
          className="sr-only"
          onChange={onInputChange}
          disabled={disabled}
          aria-hidden="true"
        />

        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 shrink-0 ${isDragging ? 'bg-primary/10' : 'bg-surface border border-border'}`}>
          <svg className={`w-5 h-5 ${isDragging ? 'text-primary' : 'text-text-muted'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <p className="text-sm font-medium text-text-primary mb-0.5 text-center">
          {isDragging ? 'Release to upload' : (
            <>
              <span className="hidden sm:inline">Drop image here or </span>
              <span className="text-primary font-semibold">tap to browse</span>
            </>
          )}
        </p>
        <p className="text-xs text-text-secondary text-center">
          JPG, PNG, WebP · Max {VALIDATION.MAX_FILE_SIZE_MB}MB
        </p>
      </div>

      {displayError && (
        <p className="text-xs text-danger flex items-start gap-1.5">
          <svg className="w-3.5 h-3.5 shrink-0 mt-px" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {displayError}
        </p>
      )}
    </div>
  );
}
