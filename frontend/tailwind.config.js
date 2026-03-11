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
      }
    },
  },
  plugins: [],
}


// -----------some info----------------
//for using bold Montserrat do => "font-bold font-montserrat" this load 700 font weight
//for using semibold Montserrat do => "font-semibold font-montserrat" this load 600 font weight
//for using OpenSans-Regular do => "font-opensans" this load default weight 400
//for using OpenSans-Medium => "font-medium font-opensans" this load 500 font weight