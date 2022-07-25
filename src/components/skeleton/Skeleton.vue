<template>
  <div class="x-skeleton">
    <section
      v-for="item in list"
      :key="item"
      :class="['x-skeleton-item', active && 'x-skeleton-active']"
      :style="styleHeight"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { uuid } from 'js-func-tools';

const props = defineProps({
    count: {
        type: Number,
        default: 3
    },
    height: {
        type: [Number, String],
        default: 0
    },
    active: {
        type: Boolean,
        default: false
    }
});
const list = computed(() => Array.from({ length: props.count }).map(() => uuid(7)));
const styleHeight = computed(() => props.height ? { height: `${props.height}px` } : null);
</script>

<style lang="stylus">
.x-skeleton
    display grid
    grid-gap 12px
    width 100%
.x-skeleton-item
    position relative
    background-color var(--skeleton-bg)
    border-radius 4px
    width 100%
    height 36px
.x-skeleton-active
    background-image linear-gradient(90deg, var(--skeleton-bg) 25%, var(--theme-opacity) 37%, var(--skeleton-bg) 63%)
    background-size 400% 100%
    animation x-skeleton-loading 1.4s ease infinite

@keyframes x-skeleton-loading
    0%
        background-position 100% 50%
    to
        background-position 0 50%

</style>
