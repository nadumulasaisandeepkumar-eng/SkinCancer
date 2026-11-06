/**
 * PageHeader — consistent page-level heading with responsive padding/sizing.
 */
export default function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {badge && (
          <span className="inline-block text-xs font-semibold text-primary bg-blue-50 border border-blue-100 rounded px-2.5 py-1 mb-3 tracking-wide uppercase">
            {badge}
          </span>
        )}
        <h1 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-sm text-text-secondary max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
