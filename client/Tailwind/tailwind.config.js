// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Comic Sans MS"', "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
});
