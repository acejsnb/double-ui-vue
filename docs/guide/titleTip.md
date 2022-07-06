# TitleTip 自定义标签title

#### 默认
<div v-titletip class="titleTip">测试测试测试测试测试测试测试测试测试</div>

::: details demo
```html
<div v-titletip class="titleTip">测试测试测试测试测试测试测试测试测试</div>
```
:::

#### 文字没有省略号
<div v-titletip>测试测试测试测试测试测试测试测试测试</div>

::: details demo
```html
<div v-titletip>测试测试测试测试测试测试测试测试测试</div>
```
:::

#### 设置最大宽度
<div v-titletip.width@400 class="titleTip">测试测试测试测试测试测试测试测试测试</div>

::: details demo
```html
<div v-titletip.width@400 class="titleTip">测试测试测试测试测试测试测试测试测试</div>
```
:::

#### 暗色主题
<div v-titletip.theme@dark class="titleTip">测试测试测试测试测试测试测试测试测试</div>

::: details demo
```html
<div v-titletip.theme@dark class="titleTip">测试测试测试测试测试测试测试测试测试</div>
```
:::

#### 自定义内容
<div v-titletip="'自定义内容'" class="titleTip">测试测试测试测试测试测试测试测试测试</div>

::: details demo
```html
<div v-titletip="'自定义内容'" class="titleTip">测试测试测试测试测试测试测试测试测试</div>
```
:::

<style lang="stylus">
.titleTip
    display inline-block
    width 160px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>

::: tip 重要提示
默认情况下，当文字没有显示省略号时不会显示title，若要强制像是title请使用 `v-titletip="'自定义内容'"`
:::

::: info 参数
```ts
type Params = {
    theme?: string
    width?: string
}
```
:::
