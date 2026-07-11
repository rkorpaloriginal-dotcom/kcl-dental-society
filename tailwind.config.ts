import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A56',
        gold: '#C9992E',
        cream: '#F7F3EC',
        body: '#1A1613',
        category: {
          academic: '#3B5BA9',
          social: '#C9992E',
          sports: '#2F7A4F',
          careers: '#6B4C9A',
          charity: '#C4547D',
          wellbeing: '#2E8C82',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-instrument)', 'Arial', 'sans-serif'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'quart-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
