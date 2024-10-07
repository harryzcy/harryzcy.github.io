// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import prettierConfig from '@vue/eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['*.config.js', '*.config.ts', '*.d.ts', 'dist/', 'node_modules/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // @ts-ignore
  ...pluginVue.configs['flat/recommended'],
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
      },
    },
    rules: {
      semi: [2, 'never'],
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
)
