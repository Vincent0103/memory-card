/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        divergentes: ['Divergentes', 'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'custom-text': 'rgba(255, 255, 255, 0.87)',
        'custom-background': '#242424',
      },
      transitionProperty: {
        'fill': 'fill',
      }
    },
  },
  plugins: [],
}

