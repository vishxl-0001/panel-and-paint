import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#080B11",
          card: "#111723",
          cardHover: "#182132",
          border: "#1F2B40",
          accent: "#FF3B30", // Electric Red
          accentOrange: "#FF6B00", // Candy Orange
          accentHover: "#E02E24",
          silver: "#E2E8F0",
          muted: "#8A99AD",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-sora)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "metallic-sheen": "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
        "glass-gradient": "linear-gradient(180deg, rgba(22, 28, 42, 0.75) 0%, rgba(13, 17, 27, 0.85) 100%)",
      },
      boxShadow: {
        "glow-red": "0 0 25px -4px rgba(255, 59, 48, 0.45)",
        "glow-orange": "0 0 25px -4px rgba(255, 107, 0, 0.45)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
export default config;
