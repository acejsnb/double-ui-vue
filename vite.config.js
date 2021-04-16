import { join, resolve } from 'path';
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
        },
        polyfillDynamicImport: true
    },
    plugins: [vueJsx(), SvgLoader()],
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.styl'], // import引入文件的时候不用加后缀
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port
    }
});
