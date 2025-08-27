import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import n from 'eslint-plugin-n'
import vue from 'eslint-plugin-vue'
import neostandard from 'neostandard'

export default [
    // 基本設定
    {
        ignores: ['dist/', 'resources/', 'ui/dist/', '*.svg', '*.xml']
    },

    // JavaScript基本設定
    js.configs.recommended,
    ...neostandard(),

    // 全体設定
    {
        languageOptions: {
            ecmaVersion: 2022
        },
        plugins: {
            import: importPlugin
        },
        rules: {
            '@stylistic/indent': ['error', 4],
            'object-shorthand': ['error'],
            'sort-imports': [
                'error',
                {
                    ignoreDeclarationSort: true
                }
            ],
            'no-console': ['error', { allow: ['info', 'warn', 'error', 'debug'] }],

            // plugin:import
            'import/order': [
                'error',
                {
                    alphabetize: {
                        order: 'asc'
                    },
                    'newlines-between': 'always-and-inside-groups'
                }
            ],
            'import/no-unresolved': 'error'
        }
    },

    // Nodes設定 (CommonJS)
    {
        files: ['nodes/**/*'],
        languageOptions: {
            sourceType: 'commonjs'
        },
        plugins: {
            n
        },
        rules: {
            'n/file-extension-in-import': 'error',
            'n/no-missing-import': 'error',
            'n/no-missing-require': 'error'
        }
    },

    // Vite設定ファイル
    {
        files: ['vite.config.mjs'],
        rules: {
            'import/no-unresolved': 'off'
        }
    },

    // UI Components設定 (Vue)
    ...vue.configs['flat/recommended'],
    {
        files: ['ui/**/*.vue', 'ui/**/*.js'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 2022
        },
        rules: {
            'vue/html-indent': ['error', 4],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/attribute-hyphenation': 'off'
        }
    }
]
