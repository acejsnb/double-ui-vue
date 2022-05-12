module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        [
            '@babel/preset-typescript',
            {
                isTSX: true,
                allExtensions: true
            }
        ]
    ],
    // presets: ['@vue/cli-plugin-babel/preset', '@babel/typescript'],
    plugins: [
        ['@vue/babel-plugin-jsx', { optimize: true, transformOn: true }],
        ['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }]
        // '@babel/plugin-transform-modules-commonjs'
    ]
};
