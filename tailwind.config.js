/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc070',
          400: '#ff9d36',
          500: '#ff7d0e',
          600: '#f06104',
          700: '#c74806',
          800: '#9e3a0d',
          900: '#7f310e',
          950: '#451604',
        },
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pop': 'pop 0.15s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'fade-in': 'fadeIn 0.15s ease-out',
        'pulse-once': 'pulseOnce 0.3s ease-out',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '60%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseOnce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)', backgroundColor: '#ff7d0e' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
