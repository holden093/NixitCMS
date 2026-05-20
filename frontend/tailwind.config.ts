import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        paper: 'var(--color-paper)',
        stone: {
          50: 'var(--color-stone-50)',
          100: 'var(--color-stone-100)',
          200: 'var(--color-stone-200)',
          300: 'var(--color-stone-300)',
          700: 'var(--color-stone-700)',
        },
        accent: 'var(--color-accent)',
        border: 'var(--color-line)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      fontSize: {
        micro: ['11px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        small: ['13px', { lineHeight: '1.5' }],
        body: ['15px', { lineHeight: '1.6' }],
        h3: ['17px', { lineHeight: '1.3' }],
        h2: ['22px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        display: ['36px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0',
        label: '0.08em',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
      },
    },
  },
  plugins: [animate],
} satisfies Config
