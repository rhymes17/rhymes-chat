/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monts: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        title: "2rem",
      },
      fontWeight: {
        "extra-light": 200,
        light: 300,
        regular: 400,
        medium: 500,
        "semi-bold": 600,
        bold: 700,
        "extra-bold": 800,
      },
      colors: {
        primary: "rgb(255,255,255)",
        secondary: "#FCC606",
        "offwhite-bg": "#EDEDED",
      },
    },
  },
  plugins: [],
};
