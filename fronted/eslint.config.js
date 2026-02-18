import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: react,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'error',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            'react/jsx-no-target-blank': 'off',
            'react/prop-types': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            quotes: ['error', 'single'],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['error'],
            semi: ['error', 'always'],
            'no-var': ['error'],
            'no-restricted-syntax': [
                'warn',
                {
                    selector: "MemberExpression[property.name='log']",
                    message: 'Убери - console.log()',
                },
            ],
            'jsx-quotes': ['warn', 'prefer-double'],
            'react/jsx-indent': ['warn', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-max-props-per-line': [
                'warn',
                { maximum: 1, when: 'always' },
            ],
            'react/jsx-first-prop-new-line': ['warn', 'multiline'],
            'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
            'no-multiple-empty-lines': [
                'warn',
                { max: 1, maxEOF: 0, maxBOF: 0 },
            ],
        },
    },
);
