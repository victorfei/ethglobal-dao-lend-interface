module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        sec1: "./public/landingPageBG.webp",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
