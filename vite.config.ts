import { resolve } from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import SvgLoader from 'vite-svg-loader';

const port = 3003;

export default defineConfig({
	build: {
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	},
	plugins: [vueJsx(), SvgLoader()],
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.vue'], // import引入文件的时候不用加后缀
		alias: {
			'@': resolve('src')
		}
	},
	server: {
		host: '0.0.0.0',
		port
	}
});
