/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mojo: {
          green: '#7AB547',
          'green-dark': '#5A9A2A',
          'green-light': '#9ACD6B',
        }
      },
    },
  },
  plugins: [],
}
