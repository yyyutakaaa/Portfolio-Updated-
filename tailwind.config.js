/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        surfaceHighlight: 'rgb(var(--color-surface-highlight-rgb) / <alpha-value>)',
        border: 'var(--color-border)',
        borderActive: 'var(--color-border-active)',
        textMain: 'rgb(var(--color-text-main-rgb) / <alpha-value>)',
        textDim: 'rgb(var(--color-text-dim-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Manrope Variable', 'Manrope', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond Variable', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
    }
  },
  plugins: [],
}
