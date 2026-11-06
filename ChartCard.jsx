/**
 * ChartCard — wrapper card for Recharts charts with consistent styling.
 * Props: title, subtitle, children (the chart), height
 */
export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`rounded-lg border border-border bg-white shadow-card ${className}`}>
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        {subtitle && (
          <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
