import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Comic Sans MS"', "cursive"],
      },
    },
  },
  plugins: [daisyui],
});
