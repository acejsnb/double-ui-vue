const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
    mode: 'production',
    entry: { index: resolve(__dirname, '../src/assets/stylus/base.styl') },
    output: {
        path: resolve(__dirname, '../lib')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ],
                include: [resolve(__dirname, '../src')],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 分离css
            filename: 'base/style.css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [ new CssMinimizerPlugin() ]
    },
    target: ['web', 'es5']
};

module.exports = config;
