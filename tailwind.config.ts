import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        lamaSky:"#C3EBFA",
        lamaSkyLight:"#EDF9FD",
        lamaPurple:"#CFCEFF",
        lamaPurpleLight:"#F1F0FF",
        lamaYellow:"#FAE27C",
        lamaYellowLight:"#FEFCE8"
      }

      // colors: {
      //   lamaSky: "#CDE4DD",     // Light, refreshing sea-green
      //   lamaSkyLight: "#EFF7F5", // Softer, almost white green
      //   lamaPurple: "#FBC4CB",     // Soft blush pink, adding warmth and lightness
      //   lamaPurpleLight: "#FFF1F2", // Very light pink, nearly white
      //   lamaYellow: "#D3CDE4",   // Muted lavender with a grey undertone
      //   lamaYellowLight: "#F5F3FA" // Soft lavender-grey with a subtle hint of purple
      // }
      
    },
  },
  plugins: [],
};
export default config;
