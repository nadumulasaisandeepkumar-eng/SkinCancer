/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // SeverityBadge dynamic classes
    'bg-success-light', 'text-success-text', 'border-success/20',
    'bg-warning-light', 'text-warning-text', 'border-warning/20',
    'bg-danger-light', 'text-danger-text', 'border-danger/20',
    'bg-surface', 'text-text-secondary', 'border-border',
    // ConfidenceBar bar colors
    'bg-success', 'bg-warning', 'bg-danger', 'bg-primary',
    // MetricCard backgrounds
    'bg-blue-50', 'text-primary', 'border-blue-100',
    'text-success', 'text-warning',
  ],
  theme: {
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A4FBF',
          dark: '#0F4184',
          hover: '#1545A8',
        },
        surface: '#F8FAFC',
        border: '#E5E7EB',
        text: {
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#DCFCE7',
          text: '#15803D',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          text: '#B45309',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#FEE2E2',
          text: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.08)',
        'elevated': '0 8px 24px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
}
