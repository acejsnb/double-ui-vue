# double-ui-vue：

-   基于 vue 的 ui 库

```text
此组件库适用于vue3.x
```

## config

-   开发预览 `dev.js`
-   打包 `prod.js`
-   所有组件打包 `full.js`
-   单组件打包 `single.ts`

## 安装

-   `npm install -S double-ui-vue`

## 按需引入

-   引入组件 `import { Button } from 'double-ui-vue'`
-   安装依赖包 `npm i -D babel-plugin-import`
-   在 .babelrc 中的 plugins 里添加

```json
[
  "import",
  {
    "libraryName": "double-ui-vue",
    "style": (name) => `${name}/style.css`
}
]
```

## 启动说明

-   npm run dev `启动开发预览`
-   npm run prod `打包成静态`
-   npm run single `打包单个组件`
-   npm run vite `开发预览`
