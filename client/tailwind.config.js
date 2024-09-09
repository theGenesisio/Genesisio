/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Overpass', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        'accent-green': '#1BA098',
        'accent-red': '#C11119',
        'logo-gold': '#F0B90B',
        'accent-change-green': '#059669',
        'primary-blue': '#081521',
        'secondary-blue': '#001F33',
        input: '#475569',
      },
      fontSize: {
        'demiTopic': ['1.5rem', { lineHeight: '2rem' }],
        'semiTopic': ['1.875rem', { lineHeight: '2.25rem' }],
        'topic': ['2.25rem', { lineHeight: '2.5rem' }]
      },
      fontWeight: {
        paragragh: '400',
        demiTopic: '500',
        semiTopic: '600',
        cta: '600',
        topic: '700',
        extra: '900',
      }
    },
  },
  plugins: [
  ],
})