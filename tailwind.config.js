/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        1000: "1000px",
      },
      margin: {
        25: "25px",
      },
      width: {
        50: "50px",
      },
      height: {
        50: "50px",
      },
    },
  },
  plugins: [],
};
