const { resolve } = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = require('./base');
const EntryObj = require('../src/single.js');

const objEntry = {};
// eslint-disable-next-line no-restricted-syntax
for (const key of Object.keys(EntryObj)) {
    objEntry[key] = EntryObj[key];
}

const config = {
    mode: 'production',
    entry: objEntry,
    output: {
        path: resolve(__dirname, '../custom'),
        assetModuleFilename: 'images/[name].[hash:5][ext][query]',
        filename: '[name]/index.js',
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    plugins: [
        new MiniCssExtractPlugin({ // 分离css
            filename: 'theme/[name].css'
        }),
        new CleanWebpackPlugin({
            verbose: true,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: [resolve(__dirname, '../custom')]
        })
    ],
    /*
        */
    optimization: {
        // minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false // 不生成LICENSE.txt
            })
        ]
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs2: 'vue',
            commonjs: 'vue',
            amd: 'vue'
        },
        'lottie-web': {
            root: 'LottieWeb',
            commonjs2: 'lottie-web',
            commonjs: 'lottie-web',
            amd: 'lottie-web'
        }
    },
    target: ['web', 'es5']
};

module.exports = merge(baseConfig, config);
