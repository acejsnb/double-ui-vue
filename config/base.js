const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { VueLoaderPlugin } = require('vue-loader'); // vue加载器

const {
    name, version, author, license
} = require('../package.json');

const { NODE_ENV, ENV } = process.env;

// 获取时间
const TimeFn = require('../get_time');

const banner = `@${name} v${version}
(c) 2019-2021 ${author}
Released under the ${license} License.
${TimeFn()}`;

/**
 * 判断是生产环境还是开发环境
 * @type {boolean}
 * isProd为true表示生产
 */
const isProd = NODE_ENV === 'production';

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */
const cssConfig = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: !isProd
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !isProd
        }
    }
];
let stylusConfig = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            sourceMap: !isProd
        }
    },
    {
        loader: 'stylus-loader',
        options: {
            sourceMap: !isProd
        }
    }
];
if (ENV === 'custom') {
    stylusConfig = [
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
    ];
} else {
    stylusConfig.push({
        loader: 'style-resources-loader',
        options: {
            injector: 'prepend',
            patterns: resolve(
                __dirname,
                ENV === 'dark' ? '../src/assets/stylus/variables-dark.styl' : '../src/assets/stylus/variables.styl'
            )
        }
    });
}

const config = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssConfig,
                exclude: /node_modules/
            },
            {
                test: /\.styl(us)?$/,
                use: stylusConfig,
                include: [resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: cssConfig,
                                stylus: stylusConfig
                            },
                            preserveWhitespace: false // 不要留空白
                        }
                    }
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: !isProd
                        }
                    }
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.svg$/,
                use: [
                    'vue-loader',
                    'vuecomponent-svg-loader'
                ],
                include: [resolve(__dirname, '../src')]
            },
            {
                test: /\.(png|jpe?g|gif|bmp)$/,
                type: 'asset/resource',
                include: [resolve(__dirname, '../src/assets')]
            }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.jsx', '.vue', '.styl'], // import引入文件的时候不用加后缀
        modules: [
            'node_modules',
            resolve(__dirname, '../src/assets'),
            resolve(__dirname, '../src/static'),
            resolve(__dirname, '../src/utils')
        ],
        alias: {
            '@': resolve(__dirname, '../src')
        }
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new VueLoaderPlugin(), // vue加载器
        new ProgressBarPlugin(
            {
                format: chalk.blue(`[  build :bar ${chalk.green.bold(':percent')} (:elapsed seconds) ]`),
                clear: true,
                summary: true
            }
        ),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ],
    bail: true, // 在第一个错误出现时抛出失败结果
    target: 'web'
};

module.exports = config;
