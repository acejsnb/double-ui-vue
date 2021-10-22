module.exports = {
    // presets: ['@babel/preset-env'],
    presets: ['@vue/cli-plugin-babel/preset', '@babel/typescript'],
    plugins: [
        ['@vue/babel-plugin-jsx', { optimize: true, transformOn: true }]
        // ['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }]
        // '@babel/plugin-transform-modules-commonjs'
    ]
};
