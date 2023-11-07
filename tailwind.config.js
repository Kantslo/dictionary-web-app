/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        Inconsolata: ["Inconsolata"],
        Lora: ["Lora"],
        Inter: ["Inter"],
        "Sans Serif": ["Inter"],
        Serif: ["Lora"],
        Mono: ["Inconsolata"],
      },
    },
  },
  plugins: [],
};
