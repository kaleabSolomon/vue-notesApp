/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        1000: "1000px",
      },
      width: {
        750: "750px",
      },
      minHeight: {
        200: "200px",
      },
      margin: {
        25: "25px",
      },
    },
  },
  plugins: [],
};
