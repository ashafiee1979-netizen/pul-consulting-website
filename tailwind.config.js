/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        serif: [
          '"Playfair Display"',
          "Georgia",
          "Cambria",
          "serif",
        ],
      },
      colors: {
        corp: {
          navy: "#0B2B45",
          navyDark: "#061D30",
          navySubtle: "#12324D",
          blue: "#16769C",
          blueHover: "#0C5D7F",
          sky: "#DCECF2",
          ice: "#F4F8FC",
          ink: "#102435",
          muted: "#5B6A73",
          line: "#D8E0E4",
          gold: "#B89556",
        },
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
        soft: "0 4px 20px -2px rgba(11, 43, 69, 0.06)",
        card: "0 10px 30px -4px rgba(11, 43, 69, 0.08)",
        executive: "0 18px 48px rgba(6, 29, 48, 0.12)",
      },
    },
  },
  plugins: [],
};
