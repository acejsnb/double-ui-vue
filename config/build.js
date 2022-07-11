const { resolve } = require('path')
const { defineConfig, build } = require('vite')
const Vue = require('@vitejs/plugin-vue')
const VueJsx = require('@vitejs/plugin-vue-jsx')
const SvgLoader = require('vite-svg-loader');
const Dts = require('vite-plugin-dts')

const components = require('../src/components.ts');

const parseName = (name) => {
    const str = name[0].toLowerCase() + name.substring(1);
    return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

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
            outPath = parseName(name);
        console.log('=== Start packaging ===', name, entryPath, outPath);
        await build({
            ...baseConfig(entryPath, outPath),
            build: {
                rollupOptions,
                // minify: true,
                minify: 'esbuild',
                lib: {
                    entry: entryPath,
                    name,
                    fileName: (format) => 'index.js',
                    // formats: ['es', 'umd']
                    formats: ['es']
                    // formats: ['umd']
                },
                outDir: `es/${outPath}`
            }
        });
    }
}

start().then(() => {
    console.log('------ Package succeeded ------')
});
