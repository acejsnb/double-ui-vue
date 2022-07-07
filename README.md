# double-ui-vue：

-   基于 vue3 的 ui 库

```text
此组件库适用于vue3.x
```

## config

-   开发预览 `dev.js`
-   打包 `prod.js`
-   所有组件打包 `full.js`
-   单组件打包 `single.ts`

## 安装

-   `npm i double-ui-vue`

## 按需引入

-   引入组件 `import { Button } from 'double-ui-vue'`
-   安装依赖包 `npm i -D vite-plugin-vue-import`
-   在 babel.config.js 中的 plugins 里添加

- 默认加载`double-ui-vue/es/[componentName]/style.css`
```js
// vite.config.js
import { defineConfig } from 'vite';
import viteComponentsImport from 'vite-plugin-vue-import';

export default defineConfig({
    // ...
    plugins: [
        viteComponentsImport([
            {
                libName: 'double-ui-vue'
            }
        ])
    ]
    // ...
});

```
- 更多 `vite-plugin-vue-import` 使用，请访问[vite-plugin-vue-import](https://github.com/xiongshuang/vite-plugin-vue-import)

## webpack中使用
- 安装 `babel-plugin-import`
```js
// babel.config.js
module.exports = {
    plugins: [
        [
            'import',
            {
                libraryName: 'double-ui-vue',
                libraryDirectory: 'es',
                style: (name) => `${name}/style.css`
            }
        ]
    ]
};
```

## 启动说明

-   npm run dev `启动开发预览`
-   npm run vite:dev `开发预览`
-   npm run prod `打包成静态`
-   npm run build `打包组件`
