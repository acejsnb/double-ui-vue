import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

const port = 3003;

export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true
        }),
        vueJsx(),
        // @ts-ignore
        svgLoader()
    ],
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
