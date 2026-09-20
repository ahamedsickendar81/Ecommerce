/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#5856D6",
          700: "#4745b8",
        },
        accent: "#5856D6",
        badge: "#1a1a2e",
        dark: "#1a1a1a",
        light: "#f8f9fa",
      },
    },
  },
  plugins: [],
};
