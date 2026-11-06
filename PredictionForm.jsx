import { useState, useCallback, useEffect } from 'react';
import UploadDropzone from './UploadDropzone';
import ImagePreviewCard from './ImagePreviewCard';
import InputField from '../common/InputField';
import Button from '../common/Button';

export default function PredictionForm({
  onSubmit,
  onReset,
  validationErrors = {},
  onClearError,
  isLoading,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [age, setAge] = useState('');

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleFileSelected = useCallback((selectedFile) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    onClearError?.('image');
  }, [previewUrl, onClearError]);

  const handleRemoveFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    onClearError?.('image');
  }, [previewUrl, onClearError]);

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    onClearError?.('age');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(file, age);
  };

  const handleReset = () => {
    handleRemoveFile();
    setAge('');
    onReset?.();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4 sm:space-y-5">
        {/* Image upload */}
        <div>
          <p className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-2">
            Dermoscopic Image
          </p>
          {file ? (
            <ImagePreviewCard
              file={file}
              previewUrl={previewUrl}
              onRemove={handleRemoveFile}
              disabled={isLoading}
            />
          ) : (
            <UploadDropzone
              onFileSelected={handleFileSelected}
              error={validationErrors.image}
              disabled={isLoading}
            />
          )}
        </div>

        {/* Age input */}
        <InputField
          id="patient-age"
          label="Patient Age"
          type="number"
          min="1"
          max="110"
          step="1"
          placeholder="e.g. 45"
          value={age}
          onChange={handleAgeChange}
          error={validationErrors.age}
          helperText="Enter patient's age in years (1–110)"
          required
          disabled={isLoading}
        />

        <div className="border-t border-border" />

        {/* Actions — full-width stacked on mobile */}
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing…' : 'Run Prediction'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="md"
            fullWidth
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
