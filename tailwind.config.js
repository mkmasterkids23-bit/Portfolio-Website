/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"],
      },
      colors: {
        accent: "#c2a4ff",
        background: "#0b080c",
      },
    },
  },

  plugins: [],
}
