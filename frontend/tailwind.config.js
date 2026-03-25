/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        carterone: ["Carter One"],
        quintessential: ["Quintessential"],
      },
      colors: {
        primaryBg: "#0F0F0F",
        sectionBg: "#1A1A1A",
        primaryText: "#FFFFFF",
        orangeColor: "#aa4e03"
      }
    },
  },
  plugins: [],
}