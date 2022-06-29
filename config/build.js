const { resolve } = require('path')
const { defineConfig, build } = require('vite')
const Vue = require('@vitejs/plugin-vue')
const VueJsx = require('@vitejs/plugin-vue-jsx')
const SvgLoader = require('vite-svg-loader');
const Dts = require('vite-plugin-dts')

const components = require('../src/components.ts');

const firstToUpperCase = (str) => {
    const arr = str.split('');
    arr[0] = arr[0].toUpperCase()
    return arr.join('')
};
const firstToLowerCase = (str) => {
    const arr = str.split('');
    arr[0] = arr[0].toLowerCase()
    return arr.join('')
};

// vite基础配置
const baseConfig = (entry, out) => defineConfig({
    mode: 'production',
    configFile: false,
    publicDir: false,
    plugins: [
        Vue({ reactivityTransform: true }), VueJsx(), SvgLoader(),
        Dts({
            entryRoot: entry,
            // outputDir: `es/${out}`,
            include: ['src/components/**/*.ts', 'src/components/**/*.tsx', 'src/components/**/*.vue'],
            exclude: ['node_modules/**', 'dist/**', 'lib/**', 'es/**']
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

const names = Object.keys(components)
const start = async () => {
    for (const name of names) {
        const entryPath = components[name],
            outPath = firstToLowerCase(name);
        console.log('=== Start packaging name ===', name);
        console.log('=== Start packaging ===', name, entryPath);
        await build({
            ...baseConfig(entryPath, outPath),
            build: {
                rollupOptions,
                minify: true,
                // minify: 'esbuild',
                lib: {
                    entry: entryPath,
                    name,
                    fileName: (format) => 'index.js',
                    // formats: ['es', 'umd']
                    formats: ['es']
                },
                outDir: `es/${outPath}`
            }
        });
    }
}

start().then(() => {
    console.log('------ Package succeeded ------')
});
