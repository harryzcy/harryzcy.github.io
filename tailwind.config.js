module.exports = {
  content: ['./src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'lang-js': '#f1e05a',
        'lang-ts': '#3178c6',
        'lang-go': '#00ADD8',
        'lang-rs': '#dea584',
        'lang-java': '#b07219',
        'lang-py': '#3572A5',
        'lang-c': '#555555'
      }
    }
  },
  plugins: [],
  safelist: [
    'text-lang-js',
    'text-lang-ts',
    'text-lang-go',
    'text-lang-rs',
    'text-lang-java',
    'text-lang-py',
    'text-lang-c'
  ]
}
