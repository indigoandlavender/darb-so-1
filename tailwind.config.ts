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
        background: "#faf8f5",
        foreground: "#1a1a1a",
        sand: "#f5f0e8",
        cream: "#faf8f5",
        olive: "#4a5043",
        muted: {
          DEFAULT: "#f0ebe3",
          foreground: "#6b6b6b",
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
