/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0c0e16',
        bg2: '#141722',
        card: '#1a1e2e',
        bd: '#2a3048',
        bdh: '#3d4566',
        tx: '#f2f3f8',
        t2: '#a8adc2',
        tm: '#6b7290',
        ac: '#6db3ff',
        ac2: '#b49bff',
        gn: '#4ade80',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
