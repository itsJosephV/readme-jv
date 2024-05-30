/* eslint-disable no-dupe-keys */
// const disabledCss = {
//   "code::before": false,
//   "code::after": false,
//   pre: false,
//   code: false,
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // typography: {
      //   DEFAULT: {css: disabledCss},
      // },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography")],
};
