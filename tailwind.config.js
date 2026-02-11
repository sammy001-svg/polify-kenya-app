/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--background)",
          surface: "var(--surface-primary)",
          "surface-secondary": "var(--surface-secondary)",
          highlight: "var(--surface-highlight)",
          text: "var(--foreground)",
          "text-muted": "var(--foreground-muted)",
        },
        kenya: {
          red: "var(--accent-red)",
          green: "var(--accent-green)",
          gold: "var(--accent-gold)",
          orange: "var(--accent-gold)", // Alias for semantic usage
        },
        border: "var(--border)",
        ring: "var(--ring)",
      },
      fontFamily: {
        baskerville: ["var(--font-baskerville)", "serif"],
      },
    },
  },
  plugins: [],
};
