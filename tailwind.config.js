/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#F1F5F9',
        accent: '#3B82F6',
        textDark: '#1F2937',
        textLight: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1E3A8A',
          secondary: '#F1F5F9',
          accent: '#3B82F6',
          neutral: '#1F2937',
          'base-100': '#FFFFFF',
        },
      },
    ],
  },
};
