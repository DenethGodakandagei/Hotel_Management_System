/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
				barlowLight: ["Barlow-ExtraLight"],
        barlow: ["Barlow-Light"]
			},
      colors:{
        primary1: "#EB5A3C", 
				primary2: "#DF9755",
        blue:"#87A2FF",
        blue2:"#E8F9FF"
      }
    },
  },
  plugins: [],
};
