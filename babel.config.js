module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				modules: false,
				useBuiltIns: 'usage',
				corejs: 3,
				targets: {
					browsers: [
						'last 2 versions',
						'Firefox ESR',
						'> 1%',
						'ie >= 11',
						'iOS >= 8',
						'Android >= 4'
					]
				}
			}
		]
		// '@babel/preset-typescript'
	],
	plugins: [
		['@vue/babel-plugin-jsx', { optimize: true, transformOn: true }],
		['@babel/plugin-transform-runtime', { corejs: { version: 3, proposals: true } }]
		// '@babel/plugin-transform-modules-commonjs'
	]
};
