const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 80,
  plugins: []
}

const isSupterLinter = process.env.VERSION_FILE === '/action/linterVersions.txt'

if (!isSupterLinter) {
  await import('prettier-plugin-tailwindcss')
  await import('@trivago/prettier-plugin-sort-imports')

  config.plugins = [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports'
  ]
  config.importOrder = ['^[./]']
  config.importOrderSeparation = true
  config.importOrderSortSpecifiers = true
}

export default config
