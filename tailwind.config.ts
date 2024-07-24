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
        'clarendon': 'Clarendon Regular',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '2/1': '2 / 1',
      },
      fontSize: {
        'xs-custom': '10px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
