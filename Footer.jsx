import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import env from '../../config/env';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-text-primary">{env.APP_NAME}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[260px]">
              AI-assisted dermoscopic screening powered by EfficientNetB3 and patient-specific feature integration.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
              Navigation
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-text-secondary hover:text-text-primary transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
              Medical Disclaimer
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              This system is for educational and research purposes only. It is not intended for clinical use without proper validation and regulatory approval.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-text-muted">
            © {year} {env.APP_NAME}. Built for research and clinical AI exploration.
          </p>
          <p className="text-xs text-text-muted">
            HAM10000 · EfficientNetB3 · Age-Fused CNN
          </p>
        </div>
      </div>
    </footer>
  );
}
