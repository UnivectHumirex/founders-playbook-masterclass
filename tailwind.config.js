/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Mirrors the inline palette used throughout App.tsx, so you can also
        // reference them as Tailwind classes if you extend the masterclass.
        playbook: {
          bg: "#161310",
          card: "#211d19",
          card2: "#2a2521",
          line: "#3a332d",
          text: "#ece4da",
          mut: "#a59c92",
          dim: "#7a726a",
          accent: "#df8a5f",
          accentDeep: "#cf6f47",
          gold: "#e0b15f",
          good: "#7fae7a",
          bad: "#cf7468",
        },
      },
    },
  },
  plugins: [],
};
