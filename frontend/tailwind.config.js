/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#070A12',
          surface: '#0F172A',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(30, 41, 59, 0.8)'
        },
        brand: {
          indigo: '#6366F1',
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          emerald: '#10B981',
          rose: '#EF4444',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glass': '0 20px 40px rgba(0, 0, 0, 0.4)',
        'glow-indigo': '0 8px 32px rgba(99, 102, 241, 0.35)',
        'glow-cyan': '0 8px 32px rgba(6, 182, 212, 0.35)'
      }
    },
  },
  plugins: [],
};
