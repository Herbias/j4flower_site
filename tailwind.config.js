const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    textIndent: {
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
    },
    extend: {},
  },
  variants: {
    textIndent: ["responsive"],
  },
  plugins: [require("tailwindcss-typography")],
};
