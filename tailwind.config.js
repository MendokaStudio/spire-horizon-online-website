import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "modal-bg": "url('../../image/elements/modal_background.png')",
      },
    },
    fontFamily: {
      "marko-one": ["marko-one-regular", "Marko One", "serif"],
    },
  },
  plugins: [flowbitePlugin],
};
