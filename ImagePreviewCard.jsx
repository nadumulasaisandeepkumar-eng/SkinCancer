import { truncateFilename, formatFileSize } from '../../utils/formatters';

export default function ImagePreviewCard({ file, previewUrl, onRemove, disabled }) {
  return (
    <div className="rounded-lg border border-border bg-white overflow-hidden flex items-stretch">
      {/* Thumbnail — slightly smaller on mobile */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-surface flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Uploaded dermoscopic image preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderIcon />
        )}
      </div>

      {/* Metadata */}
      <div className="flex-1 px-3 sm:px-4 py-3 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-sm font-medium text-text-primary truncate" title={file?.name}>
            {truncateFilename(file?.name, 28)}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            {formatFileSize(file?.size)} · {file?.type?.split('/')[1]?.toUpperCase()}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="inline-flex items-center gap-1 text-xs text-success font-medium">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Ready for analysis
          </span>
        </div>
      </div>

      {/* Remove button — minimum 44px touch target */}
      {onRemove && (
        <div className="px-2 sm:px-3 flex items-start pt-2.5">
          <button
            onClick={onRemove}
            disabled={disabled}
            aria-label="Remove image"
            className="p-2 rounded hover:bg-surface text-text-muted hover:text-danger transition-colors disabled:opacity-40 disabled:pointer-events-none min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function PlaceholderIcon() {
  return (
    <svg className="w-7 h-7 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}
