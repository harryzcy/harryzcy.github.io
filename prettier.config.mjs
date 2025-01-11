const plugins = []
// import tailwindcss from 'prettier-plugin-tailwindcss'
// import sortImports from '@trivago/prettier-plugin-sort-imports'

const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 80,
}

try {
  await import('prettier-plugin-tailwindcss')
  plugins.push('prettier-plugin-tailwindcss')
} catch (error) {
  console.warn('Error loading prettier-plugin-tailwindcss:', error)
}
try {
  await import('@trivago/prettier-plugin-sort-imports')
  plugins.push('@trivago/prettier-plugin-sort-imports')
  config.importOrder = ['^[./]']
  config.importOrderSeparation = true
  config.importOrderSortSpecifiers = true
} catch (error) {
  console.warn('Error loading @trivago/prettier-plugin-sort-imports:', error)
}

config.plugins = plugins

export default config
