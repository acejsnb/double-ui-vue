<template>
	<div>{{ name }}</div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

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
