/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rakhi: {
          dark: '#0a0708',
          card: '#140e11',
          crimson: '#e11d48',
          rose: '#f43f5e',
          gold: '#f59e0b',
          amber: '#fbbf24',
          maroon: '#4c0519',
          cream: '#faf7f2',
          sand: '#e2d9cc',
          muted: '#9ca3af'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Cinzel', 'serif'],
        handwritten: ['Caveat', 'Great Vibes', 'cursive'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.8))' },
        },
        diyaFlicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '25%': { transform: 'scale(1.08, 0.95) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.05) rotate(-2deg)', opacity: '0.85' },
          '75%': { transform: 'scale(1.04, 1) rotate(2deg)', opacity: '0.95' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'diya': 'diyaFlicker 1.8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      }
    },
  },
  plugins: [],
}
