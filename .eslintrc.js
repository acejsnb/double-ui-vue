module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        jasmine: true,
        jest: true,
        commonjs: true,
        amd: true,
        'vue/setup-compiler-macros': true
    },
    globals: {
        document: true,
        localStorage: true,
        window: true,
        Babel: true,
        Vue: true,
        VueRouter: true,
        h: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            // jsx: true,
            tsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        }
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'global-require': 0,
        'space-before-function-paren': 0,
        'no-plusplus': 0,
        'no-tabs': 0,
        'no-param-reassign': 0,
        'no-undef': 1,
        'no-unused-vars': 1,
        'dot-notation': 1,
        'no-nested-ternary': 1,
        'consistent-return': 0,
        'no-unused-expressions': 0,
        // 'comma-dangle': [2, 'always-multiline'],
        'comma-dangle': [2, 'never'],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-unresolved': [
            2,
            { ignore: ['.js', '.ts', '.tsx', '^@/', '^./', '^../', '^../Types'] }
        ],
        'import/extensions': [
            2,
            {
                js: 'never',
                ts: 'never',
                tsx: 'never',
                vue: 'always',
                svg: 'always',
                styl: 'always',
                png: 'always',
                mp4: 'always',
                webm: 'always',
                json: 'always'
            }
        ],
        'vue/no-multiple-template-root': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-ts-comment': 1
    }
};
