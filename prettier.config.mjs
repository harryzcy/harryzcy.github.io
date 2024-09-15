const plugins = []

const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 80
}

try {
  plugins.push(await import('prettier-plugin-tailwindcss'))
  plugins.importOrder = ['^[./]']
  plugins.importOrderSeparation = true
  plugins.importOrderSortSpecifiers = true
} catch (error) {
  console.warn('Error loading prettier-plugin-tailwindcss:', error)
}
try {
  plugins.push(await import('@trivago/prettier-plugin-sort-imports'))
} catch (error) {
  console.warn('Error loading @trivago/prettier-plugin-sort-imports:', error)
}

config.plugins = plugins

export default config
