<template>
    <div
        v-titletip
        class="titleTip"
    >
        测试测试测试测试测试测试测试测试测试
    </div>
    <br>
    <div
        v-titletip.theme@dark.width@400="'哈哈哈哈哈哈'"
        class="titleTip"
    >
        测试测试测试测试测试测试测试测试测试
    </div>
    <br><br><br><br>
    <div title="啦啦啦啦啦啦啦啦啦啦啦啦啦">
        耶耶耶夜夜爷爷也饿耶耶耶也
    </div>
</template>

<script lang="ts" setup>
import TitleTip from '@/components/title-tip';

const vTitletip = TitleTip;

</script>

<style lang="stylus" scoped>
.titleTip
    display inline-block
    width 160px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
