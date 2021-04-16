const { resolve } = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { ENV } = process.env;

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
        path: resolve(__dirname, `../${!ENV ? 'dist' : ENV}`),
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
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false, // 不生成LICENSE.txt
                terserOptions: {
                    toplevel: true, // 最高级别，删除无用代码
                    // ie8: true,
                    safari10: true
                }
            }),
            new CssMinimizerPlugin()
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

if (!ENV) {
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../src/components/static/iconSvg'),
                    to: resolve(__dirname, '../lib/static/iconSvg')
                }
            ]
        })
    );
}

module.exports = merge(baseConfig, config);
