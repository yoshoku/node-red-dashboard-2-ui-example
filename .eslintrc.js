module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'standard'
      ],
      rules: {}
    },
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      extends: [
        'standard',
        'plugin:vue/vue3-essential'
      ]
    },
    {
      files: ['**/*.d.ts'],
      rules: {}
    },
    {
      files: ['resources/**'],
      rules: {
        // Disable all rules for generated files
        '*': 'off'
      }
    }
  ],
  ignorePatterns: ['resources/**', 'ui/dist/**', 'node_modules/**']
}
