const { resolve } = require('path')
const { build } = require('vite')

build({
    build:{
        rollupOptions: {
            input: {
                base: resolve(__dirname, '../src/assets/stylus/base.styl'),
            },
            output: {
                assetFileNames: 'base.css'
            }
        },
        outDir: 'es',
    }
}).then(() => {
    console.log('base.css打包成功')
})
