/** @type {import('tailwindcss').Config} */
import catppuccin from "@catppuccin/daisyui";
module.exports = {
  content: ["./public/index.html", "src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      prefix: "ctp",
      defaultFlavour: "mocha",
    }),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["dark", catppuccin("mocha")],
  },
};
