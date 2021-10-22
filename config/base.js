const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { VueLoaderPlugin } = require('vue-loader'); // vue加载器
const { name, version, author, license } = require('../package.json');

const { WEBPACK_SERVE } = process.env;

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
const isProd = !WEBPACK_SERVE;

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */const cssConfig = (step = 1) => [
	isProd ? MiniCssExtractPlugin.loader : 'style-loader',
	{
		loader: 'css-loader',
		options: {
			importLoaders: step,
		}
	},
	{ loader: 'postcss-loader' }
];

const config = {
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: cssConfig(1)
			},
			{
				test: /\.styl$/,
				use: [
					...cssConfig(2),
					{
						loader: 'stylus-loader',
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							plugins: ['@babel/transform-typescript'],
							preserveWhitespace: false // 不要留空白
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: !isProd
						}
					}
				]
			},
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: !isProd
						}
					},
					{
						loader: 'ts-loader'
					}
				],
				// exclude: /node_modules/
			},
			{
				test: /\.svg$/,
				use: [
					'babel-loader',
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
	resolve: {
		// import引入文件的时候不用加后缀
		extensions: ['.js', '.ts', '.tsx'],
		// 配置路径别名
		alias: {
			'@': resolve(__dirname, '../src')
		}
	},
	plugins: [
		new webpack.BannerPlugin({
			banner,
			test: /\.js$/
		}),
		new VueLoaderPlugin(), // vue加载器
		new ProgressBarPlugin({
			format: chalk.blue(
				`* double-ui-vue build [:bar ${chalk.green.bold(':percent')}] (:elapsed seconds)`
			),
			clear: true,
			summary: true
		}),
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		})
	],
	bail: true, // 在第一个错误出现时抛出失败结果
	target: 'web'
};

module.exports = config;
