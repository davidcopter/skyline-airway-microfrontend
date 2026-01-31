/** @type {import('tailwindcss').Config} */
const sharedConfig = require("../../packages/shared/src/config/tailwind.config.js");

module.exports = {
  ...sharedConfig,
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
};
