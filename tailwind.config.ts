import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f6f3",
        foreground: "#1c1c1c",
        sand: "#edeae4",
        cream: "#f7f6f3",
        accent: "#2d7d6f",
        muted: {
          DEFAULT: "#e8e5df",
          foreground: "#5a5a5a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
