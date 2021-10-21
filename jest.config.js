const { resolve } = require('path');

module.exports = {
	rootDir: resolve(__dirname),
	// clearMocks: true,
	// coverageDirectory: 'coverage',
	// coverageProvider: 'v8',
	moduleFileExtensions: ['js', 'ts', 'tsx', 'node', '.styl'],
	moduleNameMapper: {
		'@/(.*)$': '<rootDir>/src/$1'
	},
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['/node_modules/', 'node', '/*.styl/'],
	transform: {
		// '^.+\\.tsx?$': 'ts-jest' // ts 文件用 ts-jest 转换
		'^.+\\.(t|j)sx?$': [
			'babel-jest',
			{
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								node: 'current'
							}
						}
					],
					'@babel/preset-typescript'
				],
				plugins: ['@vue/babel-plugin-jsx', '@babel/plugin-transform-modules-commonjs']
			}
		],
		'\\.(svg|styl$)$': 'jest-transform-stub'
	},
	// 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$',
	globals: {
		'vue-jest': {
			babelConfig: {
				configFile: '<rootDir>/babel.config.js'
			}
		}
	}
};
