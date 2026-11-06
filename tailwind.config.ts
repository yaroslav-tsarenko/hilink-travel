import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      colors: {
        sand: {
          DEFAULT: '#efe6d8',
          50: '#f8f3ea',
          100: '#f3ece0',
          200: '#e6dac6',
          300: '#d6c5aa',
        },
        pine: {
          DEFAULT: '#1f3d2b',
          600: '#2a5139',
          800: '#183022',
          900: '#112418',
          tint: '#dfe5d6',
        },
        ember: {
          DEFAULT: '#e0632e',
          ink: '#b0461a',
          tint: '#f6d9c6',
        },
        ink: {
          DEFAULT: '#1b1a17',
          soft: '#4f4a41',
          mute: '#6b655a',
        },
        line: '#d3c4ab',
      },
      screens: {
        xs: '400px',
        '3xl': '1800px',
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(27,26,23,0.06), 0 12px 32px -18px rgba(27,26,23,0.35)',
        lift: '0 24px 60px -30px rgba(17,36,24,0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
