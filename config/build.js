const { resolve } = require('path')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const SvgLoader = require('vite-svg-loader');
const dts = require('vite-plugin-dts')

const single = require('../src/single.ts');

const firstToUpperCase = (str) => {
    const arr = str.split('');
    arr[0].toUpperCase()
    return arr.join('')
};

// vite基础配置
const baseConfig = (key) => defineConfig({
    mode: 'production',
    configFile: false,
    publicDir: false,
    plugins: [
        vue({ reactivityTransform: true }), vueJsx(), SvgLoader(),
        dts({
            // outputDir: `es/${firstToUpperCase(key)}`,
            entryRoot: single[key],
            include: ['src/components/**/*.ts', 'src/components/**/*.d.ts', 'src/components/**/*.tsx', 'src/components/**/*.vue'],
            exclude: ['node_modules', 'dist', 'lib', 'es']
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.vue'],
        alias: {
            '@': resolve('src')
        }
    }
});

// rollup配置
const rollupOptions = {
    external: ['vue'],
    output: {
        globals: {
            vue: 'Vue'
        }
    }
};

const keys = Object.keys(single)
console.log('---keys---', keys);
const start = async () => {
    for (const key of keys) {
        console.log('=== Start packaging ===', key, single[key]);
        await build({
            ...baseConfig(key),
            build: {
                rollupOptions,
                minify: true,
                lib: {
                    entry: single[key],
                    name: key,
                    fileName: (format) => 'index.js',
                    // formats: ['es', 'umd']
                },
                outDir: `es/${key}`
            }
        });
    }
}

start().then(() => {
    console.log('------ Build Success ------')
});
