/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  extend: {
    colors: {
      darkest: "#222831",
      darker: "#393E46",
      dark: "#5b6169",
      accent: "#00ADB5",
    
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark"],
  },
};
