import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mediumGray: "#66686D",
        defaultBlue: "#2684FF",
        hoverGray: "#bbbbbb",
        tagGray: "#E1DFDF",
        greenCorrect: "#6AC86A",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

