/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          primary: '#7C3AED', // Violet 600 - More vibrant main color
          secondary: '#8B5CF6', // Violet 500
          deep: '#4C1D95',    // Violet 900 - Dark text/bg
          light: '#DDD6FE',   // Violet 200 - Accents
          surface: '#F5F3FF', // Violet 50 - Backgrounds
          neutral: '#6B7280',
        }
      }
    },
  },
  plugins: [],
};
