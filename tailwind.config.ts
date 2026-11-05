import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        green: {
          10: '#EAF7EF',
          20: '#C9EBD5',
          50: '#30AF5B',
          60: '#26914A',
          90: '#292C27',
        },
        gray: {
          5: '#F7F7F5',
          10: '#EEEEEE',
          20: '#A2A2A2',
          30: '#7B7B7B',
          50: '#585858',
          90: '#141414',
        },
        orange: {
          10: '#FFF1EA',
          50: '#FF814C',
        },
        blue: {
          70: '#021639',
        },
        yellow: {
          50: '#FEC601',
        },
      },
      backgroundImage: {
        'bg-img-1': "url('/img-1.webp')",
        'bg-img-2': "url('/img-2.webp')",
        'feature-bg': "url('/feature-bg.webp')",
        pattern: "url('/pattern.webp')",
        'pattern-2': "url('/pattern-bg.webp')",
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        dash: { to: { strokeDashoffset: '0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
