/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          50: '#E6F2FF',
          100: '#CCE5FF',
          500: '#007AFF',
          600: '#0056CC',
          700: '#003D99',
        },
        secondary: {
          DEFAULT: '#34C759',
          50: '#E8F8ED',
          100: '#D1F1DB',
          500: '#34C759',
          600: '#2AA54A',
          700: '#1F7A36',
        },
        accent: {
          DEFAULT: '#FF3B30',
          50: '#FFE6E5',
          100: '#FFCCCA',
          500: '#FF3B30',
          600: '#E6342A',
          700: '#CC2D24',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
        },
        text: {
          primary: '#1D1D1F',
          secondary: '#86868B',
          tertiary: '#C7C7CC',
        },
        card: {
          DEFAULT: '#FFFFFF',
          shadow: 'rgba(0,0,0,0.08)',
        }
      },
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0,0,0,0.08)',
        'button': '0 2px 8px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}