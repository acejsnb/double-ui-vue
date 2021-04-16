const { resolve } = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理垃圾文件
const TerserPlugin = require('terser-webpack-plugin');

const { ENV } = process.env;
const baseConfig = require('./base');

const config = {
    mode: 'production',
    entry: {
        index: resolve(__dirname, '../src/multiple.js') // 入口文件
    },
    output: {
        path: resolve(__dirname, `../${ENV === 'dark' ? ENV : 'dist'}`),
        filename: 'index.js',
        publicPath: '/',
        assetModuleFilename: 'images/[name].[hash:5][ext][query]',
        library: 'meri-design',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'
    },
    plugins: [
        new MiniCssExtractPlugin({ // 分离css
            filename: '[name].css'
        }),
        new CleanWebpackPlugin({
            verbose: true,
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: (
                !ENV
                    ? [resolve(__dirname, '../dist'), resolve(__dirname, '../lib')]
                    : [resolve(__dirname, `../${ENV}`)]
            )
        })
    ],
    optimization: {
        // minimize: true,
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

module.exports = merge(baseConfig, config);
