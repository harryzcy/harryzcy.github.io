module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lang-js': {
          light: '#f1e05a',
          dark: '#f1e05a'
        },
        'lang-ts': {
          light: '#2b7489',
          dark: '#6ca1da'
        },
        'lang-go': {
          light: '#00add8',
          dark: '#00add8'
        },
        'lang-rs': {
          light: '#dea584',
          dark: '#d28356'
        },
        'lang-java': {
          light: '#b07219',
          dark: '#b07219'
        },
        'lang-py': {
          light: '#3572A5',
          dark: '#659ecd'
        },
        'lang-c': {
          light: '#555555',
          dark: '#555555'
        }
      }
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /text-lang-(js|ts|go|rs|java|py|c)-light/
    },
    'dark:text-lang-js-dark',
    'dark:text-lang-ts-dark',
    'dark:text-lang-go-dark',
    'dark:text-lang-rs-dark',
    'dark:text-lang-java-dark',
    'dark:text-lang-py-dark',
    'dark:text-lang-c-dark'
  ]
}
