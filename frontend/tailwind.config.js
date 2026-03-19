/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        herb: '#f6f3eb',
        forest: {
          50: '#f2f8f0',
          100: '#e5f1e1',
          200: '#cbd3c3',
          300: '#b1b5a5',
          400: '#8a9274',
          500: '#3d6a31',
          600: '#2d5225',
          700: '#1e3a18',
          800: '#18301f',
          900: '#0f1f15',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        full: '999px',
      },
    },
  },
  plugins: [],
}
