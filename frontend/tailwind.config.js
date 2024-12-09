/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D68C4", // Retaining the primary color
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to top right,#2C69D1, #F5F7F6 )', // Custom gradient
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
}
