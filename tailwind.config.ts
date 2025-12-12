import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: {
          DEFAULT: "#1C1C1E",
          muted: "#4A4A4F",
        },
        accent: {
          DEFAULT: "#F5B302",
          soft: "#FFF7E0",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F5F7",
        },
        border: "#E5E7EB",
        danger: "#EF4444",
        success: "#16A34A",
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.06)",
        subtle: "0 4px 12px rgba(0,0,0,0.04)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;
