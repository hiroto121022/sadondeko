/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zen-antique': ['Zen Antique Soft', 'serif'], // カスタムフォントを追加
      },
      screens: {
        'max-lg': { 'max': '1200px' },
        'max-md': { 'max': '750px' }, // md以下のサイズ
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        lightblue: "#edf3f3;",
        skyblue: '#cddee0',
        skybluebg: '#f6f9f9',
        success: "#0070f3",
        cyan: "#79FFE1",
        sadondeko: '#a90500',
      },
      maxWidth: {
        '1256': '1256px',
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out',
        slideOut: 'slideOut 0.5s ease-in',
      },
    },
  },
  variants:{},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
