import eslint from '@eslint/js'
import prettierConfig from '@vue/eslint-config-prettier'
import {
  defineConfigWithVueTs,
  vueTsConfigs
} from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default defineConfigWithVueTs(
  {
    ignores: ['*.config.js', '*.config.ts', '*.d.ts', 'dist/', 'node_modules/']
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest'
      }
    },
    rules: {
      semi: [2, 'never']
    }
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked
  }
)
