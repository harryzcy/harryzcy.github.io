const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 80,
  plugins: []
}

try {
  await import('prettier-plugin-tailwindcss')
  config.plugins.push('prettier-plugin-tailwindcss')
} catch (error) {
  console.warn('Error loading prettier-plugin-tailwindcss:', error)
}
try {
  await import('@trivago/prettier-plugin-sort-imports')
  config.plugins.push('@trivago/prettier-plugin-sort-imports')
  config.importOrder = ['^[./]']
  config.importOrderSeparation = true
  config.importOrderSortSpecifiers = true
} catch (error) {
  console.warn('Error loading @trivago/prettier-plugin-sort-imports:', error)
}

export default config
