import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:   '#1A1A2E',
          orange: '#E8572A',
          gray:   '#8A8A9A',
          cream:  '#F5F0EC',
          dark:   '#3A3A4E',
        },
      },
      height: {
        '13': '52px',
      },
    },
  },
  plugins: [],
};

export default config;
