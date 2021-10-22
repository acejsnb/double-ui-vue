module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        commonjs: true,
        amd: true
    },
    /* settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx', '.vue']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
            }
        }
    }, */
    globals: {
        NodeJS: true,
        Babel: true,
        mountNode: true,
        document: true,
        localStorage: true,
        window: true,
        Vue: true,
        VueRouter: true,
        h: true,
        JSX: true
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
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            // jsx: true,
            tsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        'vue/comment-directive': 'off',
        'vue/html-indent': [2, 4],
        'vue/require-valid-default-prop': 1,
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-explicit-any': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-unresolved': [2, { ignore: [''] }],
        'import/no-webpack-loader-syntax': 0,
        'import/prefer-default-export': 0,
        'arrow-body-style': [2, 'as-needed'], // 箭头函数
        'class-methods-use-this': 0, // 强制类方法使用 this
        // 缩进Indent with 4 spaces
        semi: [2, 'always'],
        indent: [2, 4],
        'no-console': 0, // 不禁用console
        'no-debugger': 2, // 禁用debugger
        'no-shadow': 0,
        'comma-dangle': [2, 'never'],
        'no-use-before-define': 'off',
        'global-require': 'off',
        'import/extensions': ['error', {
            js: 'never',
            ts: 'never',
            // vue: 'never',
            tsx: 'never',
            svg: 'always',
            styl: 'always',
            jpg: 'always',
            jpeg: 'always',
            png: 'always',
            mp4: 'always',
            webm: 'always',
            md: 'always',
            css: 'always'
        }],
        quotes: [1, 'single'],
        'eol-last': 2,
        'no-else-return': 2,
        'no-empty': 2,
        eqeqeq: 2,
        'no-multiple-empty-lines': [1, { max: 2 }],
        'no-trailing-spaces': 1,
        'no-param-reassign': 0,
        'key-spacing': [0, { beforeColon: false, afterColon: true }],
        'padded-blocks': 2,
        'no-unused-vars': 0,
        'no-plusplus': 0,
        'no-lonely-if': 0,
        'max-len': 0,
        'space-before-function-paren': 0
    }
};
