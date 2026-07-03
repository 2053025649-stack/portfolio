/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050508',  // deepest — slight warm-blue tint, never pure black
          900: '#0a0a0e',  // near-black with warmth
          800: '#111115',  // body bg — tinted warm-neutral
          700: '#1a1a20',  // card / surface
          600: '#24242c',  // elevated surface
          500: '#33333b',  // border / subtle
          400: '#44444e',  // muted interactive
        },
        accent: {
          DEFAULT: '#d4a574',   // warm brass — the brand anchor
          warm:    '#c9976b',   // warmer variant
          cool:    '#a8947a',   // cooler / muted variant
          glow:    'rgba(212,165,116,0.18)', // subtle tint overlay
        },
        // Renamed from 'sage' — use for text on dark backgrounds
        surface: {
          DEFAULT: '#f0eee8',           // body text — slightly warm off-white
          light:    '#faf9f6',          // headings
          muted:    'rgba(240,238,232,0.65)', // secondary text
          faint:    'rgba(240,238,232,0.35)', // tertiary / placeholder
        },
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Noto Sans SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(60px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
