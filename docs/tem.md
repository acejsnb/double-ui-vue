# xxx xxx

<script setup>
</script>

::: details demo数据
```js
import { ref } from 'vue';
const breadData = [
    { id: 'totalEnergy', name: '总量总量总量总量总量总量总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
];
const breadId = ref('average');
const breadChange = (id) => {
    console.log(id);
    breadId.value = id;
}
```
:::

#### 设置data、v-model、change
<Breadcrumb :data="breadData" v-model="breadId" @change="breadChange" />

::: details demo
```html
<Breadcrumb :data="breadData" v-model="breadId" @change="breadChange" />
```
:::

### Attributes
| 参数     | 说明       | 类型       | 默认值       | 必须    |
| ------- |----------|----------|-----------|-------|
| data    | 数据列表     | Array    | []        | true  |
| v-model    | 双向绑定的值   | String   | ''        | false |
| separator    | 分隔符      | String | ''        | false    |
| @change    | 点击item回调 | Function | (id) => {} | false    |
