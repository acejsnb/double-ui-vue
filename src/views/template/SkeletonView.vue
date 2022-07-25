<template>
    <div class="skeleton">
        <Skeleton active />
    </div>
</template>

<script lang="ts" setup>
import Skeleton from '@/components/skeleton/Skeleton.vue';
</script>

<style lang="stylus" scoped>
.skeleton
    padding 12px
    //background-color #0a424b
    width 100%
    height 700px
</style>
