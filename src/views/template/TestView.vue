<template>
    <div>{{ name }}</div>
<!--  <Breadcrumb :data="breadData" />-->
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
// import Breadcrumb from '../../../lib/Breadcrumb';

const breadData = ref([
    { id: 'totalEnergy', name: '总量总量总量总量总量总量总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
]);
const name = ref<string>('Vue');
let count = $ref(0);

watchEffect((onCleanup) => {
    console.log('=====', count);
    const timer = setInterval(() => {
        count += 1;
    }, 1000);
    onCleanup(() => {
        console.log('执行清除');
        clearInterval(timer);
    });
});

setTimeout(() => {
    name.value = 'Hello';
}, 3000);
</script>

<style scoped></style>
