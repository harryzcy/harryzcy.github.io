const plugins = []

try {
  plugins.push(await import('prettier-plugin-tailwindcss'))
} catch (error) {
  console.warn('Error loading prettier-plugin-tailwindcss:', error)
}
try {
  plugins.push(await import('@trivago/prettier-plugin-sort-imports'))
} catch (error) {
  console.warn('Error loading @trivago/prettier-plugin-sort-imports:', error)
}

const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 80,
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins
}

export default config
