/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}", // ← covers root-level + any subfolders
    "!./node_modules/**",     // ← exclude node_modules explicitly
  ],
  theme: { extend: {} },
  plugins: [],
};