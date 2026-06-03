/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#080808',
          800: '#0f0f0f',
          700: '#1a1a1a',
          600: '#262626',
          500: '#333333',
          400: '#404040',
        },
        accent: {
          DEFAULT: '#d4a574',
          warm: '#c9976b',
          cool: '#a8947a',
        },
        sage: {
          DEFAULT: '#ffffff',
          light: '#ffffff',
          muted: 'rgba(255,255,255,0.65)',
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
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(40px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        reveal: { '0%': { opacity: '0', transform: 'translateY(60px) scale(0.97)' }, '100%': { opacity: '1', transform: 'translateY(0) scale(1)' } },
        scroll: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      screens: { 'xs': '480px' },
    },
  },
  plugins: [],
}
