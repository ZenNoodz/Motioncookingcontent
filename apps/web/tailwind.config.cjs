const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ecc474",
        bg: "#ffffff",
        surface: "#faf7ef",
        border: "rgba(0,0,0,0.08)",
        text: "#0b0b0c",
        muted: "#5a5a5a"
      },
      fontFamily: {
        sans: ["-apple-system", "Segoe UI", ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem"
      },
      boxShadow: {
        card: "0 2px 6px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};
