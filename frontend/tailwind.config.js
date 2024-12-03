/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F51FF", // Retaining the primary color
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to top right, #2b6cb0, #6f2c91)', // Custom gradient
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}