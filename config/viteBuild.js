const { resolve } = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const SvgLoader = require('vite-svg-loader');

const single = require('../src/single.ts');

// vite基础配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue({ reactivityTransform: true }), vueJsx(), SvgLoader()],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.vue'],
        alias: {
            '@': resolve('src')
        }
    }
})
// rollup配置
const rollupOptions = {
    external: ['vue'],
    output: {
        globals: {
            vue: 'Vue'
        }
    }
};

(async () => {
    for (const key of Object.keys(single)) {
        await build({
            ...baseConfig,
            build: {
                rollupOptions,
                lib: {
                    entry: single[key],
                    // umd的变量名
                    name: key,
                    // 输出文件名
                    fileName: (format) => 'index.js',
                    // fileName: 'index', // 输出文件名
                    formats: ['es', 'umd']
                    // formats: ['umd']
                },
                outDir: resolve(__dirname, `../lib/${key}`)
            }
        });
    }
})()
