/** @type {import('tailwindcss').Config} */
/* Only Tailwind's preflight reset is used (see src/index.css); every page is
   styled by src/ink.css. */
export default {
  content: ['./index.html', './index.tsx', './App.tsx', './components/**/*.tsx', './pages/**/*.tsx'],
  theme: { extend: {} },
  plugins: [],
};
