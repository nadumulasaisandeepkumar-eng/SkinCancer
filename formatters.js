/**
 * Formatting utility functions.
 * Keeps display logic out of components.
 */

/**
 * Format a decimal percentage to a rounded string with %.
 * e.g. 94.712 → "94.7%"
 */
export function formatPercent(value, decimals = 1) {
  if (value === null || value === undefined) return '—';
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Format a number to fixed decimal places.
 * e.g. 0.9213 → "0.921"
 */
export function formatDecimal(value, decimals = 3) {
  if (value === null || value === undefined) return '—';
  return Number(value).toFixed(decimals);
}

/**
 * Format a metric score (0–1 range) to a percentage string.
 * e.g. 0.921 → "92.1%"
 */
export function formatMetricAsPercent(value, decimals = 1) {
  if (value === null || value === undefined) return '—';
  return `${(Number(value) * 100).toFixed(decimals)}%`;
}

/**
 * Truncate a filename for display.
 */
export function truncateFilename(name, maxLength = 32) {
  if (!name) return '';
  if (name.length <= maxLength) return name;
  const ext = name.split('.').pop();
  const base = name.slice(0, maxLength - ext.length - 4);
  return `${base}...${ext}`;
}

/**
 * Format bytes to a human-readable size string.
 */
export function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB'];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(1)} ${units[i]}`;
}
