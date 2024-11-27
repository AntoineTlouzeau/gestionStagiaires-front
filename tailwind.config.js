module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  theme: {
      extend: {
          colors: {
              primary: {
                  lightest: '#D7E5FF',
                  lighter: '#A1C2FC',
                  light: '#2E8FF4',
                  DEFAULT: '#2E8FF4',
                  dark: '#0E6BCC',
                  darker: '#084886',
                  darkest: '#042C43',
              },
              secondary: {
                  lightest: '#FFE1BF',
                  lighter: '#FBCD8F',
                  light: '#ED740F',
                  DEFAULT: '#ED740F',
                  dark: '#B35A0B',
                  darker: '#6C3606',
                  darkest: '#341B03',
              },
              background: {
                  lightest: '#FFFFFF',
                  lighter: '#F7F8FA',
                  light: '#EBF4FE',
                  DEFAULT: '#EBF4FE',
                  dark: '#9EA3B0',
                  darker: '#6B7280',
                  darkest: '#000000',
              },
              gray: {
                  DEFAULT: '#6B7280',
                  750: '#2B3544',
              },
          },
      },
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
