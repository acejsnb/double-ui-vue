const { resolve } = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

const baseConfig = require('./base');

const single = require('../src/single.ts');
const objEntry = {};
for (const key of Object.keys(single)) {
	objEntry[key] = single[key];
}
const config = {
	mode: 'production',
	entry: objEntry,
	output: {
		path: resolve(__dirname, '../lib'),
		assetModuleFilename: 'images/[name].[hash:5][ext][query]',
		filename: '[name]/index.js',
		library: '[name]',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: '@import "../../base/style.css";',
			raw: true,
			test: /\.css$/
		}),
		new MiniCssExtractPlugin({
			// 分离css
			filename: '[name]/style.css'
		}),
		/*new TypescriptDeclarationPlugin({
			out: '[name]/index.d.ts'
		})*/
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
		}
	},
	target: ['web', 'es5']
};

module.exports = merge(baseConfig, config);
