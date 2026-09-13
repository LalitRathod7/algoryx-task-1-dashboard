/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        // Core palette — deep teal ink + slate surfaces + burnt-amber accent.
        ink: {
          50: "#F5F7F7",
          100: "#E7EBEA",
          200: "#C7D0CE",
          400: "#5C6B68",
          600: "#33413F",
          800: "#1B2523",
          900: "#12181F",
        },
        brand: {
          50: "#EAF3F0",
          100: "#CFE5DD",
          300: "#7FB3A2",
          500: "#2F6F5E",
          600: "#265A4C",
          700: "#1E483D",
        },
        amber: {
          100: "#FBE6D8",
          300: "#F0B78A",
          500: "#E0733B",
          600: "#C25E2B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7F8FA",
          border: "#E4E7EB",
        },
      },
      boxShadow: {
        panel: "0 1px 2px rgba(18, 24, 31, 0.04), 0 1px 0 rgba(18, 24, 31, 0.03)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "slide-in": "slide-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
