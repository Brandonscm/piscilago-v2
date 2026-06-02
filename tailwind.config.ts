import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        col: {
          50: "#E8EEF7",
          100: "#C5D3E8",
          200: "#9BB2D5",
          400: "#3B6AAE",
          500: "#1565C0",
          600: "#003478",
          700: "#002D6E",
          800: "#001F4D",
          900: "#001233",
        },
        sun: {
          50: "#FFF8E1",
          100: "#FFECB3",
          400: "#FFCA28",
          500: "#FFB300",
          600: "#FF8F00",
          700: "#FF6F00",
        },
        wild: {
          50: "#FCE4EC",
          100: "#F8BBD0",
          400: "#EC407A",
          500: "#E91E63",
          600: "#C2185B",
          700: "#AD1457",
          800: "#880E4F",
        },
        aqua: {
          50: "#E0F2F1",
          100: "#B2DFDB",
          400: "#26A69A",
          500: "#00897B",
          600: "#00695C",
          800: "#004D40",
        },
        ink: {
          900: "#0A2540",
          700: "#1F3A5F",
          500: "#5A7184",
          300: "#94A3B8",
          100: "#E2E8F0",
          50: "#F1F5F9",
        },
        surface: { 50: "#F4F7FA", 100: "#FFFFFF" },
        status: {
          green: "#2E7D32", "green-soft": "#E8F5E9",
          yellow: "#F57F17", "yellow-soft": "#FFF8E1",
          red: "#C62828", "red-soft": "#FFEBEE",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 6px rgba(0, 52, 120, 0.06)",
        elevated: "0 4px 16px rgba(0, 31, 77, 0.12)",
        hero: "0 8px 24px rgba(0, 31, 77, 0.18)",
        wild: "0 4px 16px rgba(233, 30, 99, 0.18)",
      },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem" },
    },
  },
  plugins: [],
};
export default config;
