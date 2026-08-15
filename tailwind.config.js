/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          terracotta: "#A66B55",
          "terracotta-dark": "#8D5947",
          gold: "#E9C46A",
          sand: "#C9A68F",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#A66B55",
          "primary-focus": "#8D5947",
          "primary-content": "#FFFFFF",
          secondary: "#E9C46A",
          "secondary-focus": "#D4A23A",
          "secondary-content": "#211E1D",
          accent: "#C9A68F",
          neutral: "#211E1D",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F9F5F0",
          "base-300": "#E8DED2",
          "base-content": "#3D352F",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
        dark: {
          primary: "#A66B55",
          "primary-focus": "#8D5947",
          "primary-content": "#FFFFFF",
          secondary: "#E9C46A",
          "secondary-focus": "#D4A23A",
          "secondary-content": "#211E1D",
          accent: "#C9A68F",
          neutral: "#1C1A19",
          "neutral-content": "#F9F5F0",
          "base-100": "#141312",
          "base-200": "#1C1A19",
          "base-300": "#2A2624",
          "base-content": "#F9F5F0",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
