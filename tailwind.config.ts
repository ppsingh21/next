import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pran-red': '#d20062',
      },
      translate: {
        '96': '24rem',
        '108': '27rem',
        '120': '30rem',
      },
      fontFamily: {
        'clarendon': ['"Clarendon Regular"', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
