import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-7xl font-bold text-border tabular-nums mb-4">404</span>
      <h1 className="text-xl font-semibold text-text-primary mb-2">Page Not Found</h1>
      <p className="text-sm text-text-secondary max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved. 
        Navigate back to continue using DermAI Clinical.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="h-9 px-5 flex items-center text-sm font-medium rounded bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Go to Home
        </Link>
        <Link
          to="/predict"
          className="h-9 px-5 flex items-center text-sm font-medium rounded border border-border text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
        >
          Start Prediction
        </Link>
      </div>
    </div>
  );
}
