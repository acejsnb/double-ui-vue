module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: 'defaults'
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
    plugins: [
        ['@vue/babel-plugin-jsx', { optimize: true, transformOn: true }],
        '@babel/plugin-transform-runtime'
        // '@babel/plugin-transform-modules-commonjs'
    ]
};
