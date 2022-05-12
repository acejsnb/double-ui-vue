<template>
    <table class="x-table-header" :style="width && { width: `${width}px` }">
        <colgroup>
            <col v-for="c in colsWidth" :key="c.id" :width="c.w">
        </colgroup>
        <thead>
            <tr class="x-table-tr x-table-header_row">
                <td class="x-table-td"
                    v-for="h in data" :key="h.key"
                    :class="[
                        (h.fixed === 'left' && scrollLeftValue) && 'x-table-td-fixed_left',
                        (h.fixed === 'right' && fixedRight) && 'x-table-td-fixed_right'
                    ]"
                >
                    <div class="x-table-col x-header-col" @mouseenter="setHtmlTagTitle">
                        {{h.text}}
                    </div>
                </td>
            </tr>
        </thead>
    </table>
</template>

<script lang="ts" setup>
import { textEllipsis } from 'js-func-tools';
import { ColumnItem, ColWidthItem } from './type';

interface Props {
    colsWidth: ColWidthItem[]
    data: ColumnItem[]
    scrollLeftValue: number
    fixedRight: boolean
    width?: number
}
const props = withDefaults(defineProps<Props>(), {
    width: 0,
    scrollLeftValue: 0,
    fixedRight: false,
    colsWidth: () => [],
    data: () => []
});

// 设置标签title
const setHtmlTagTitle = (e: MouseEvent) => textEllipsis(e);

</script>

<style lang="stylus">
.x-table-header
    display table
    table-layout fixed
    background-color var(--grey-100)
    color var(--grey-600)
    width 100%
    height 40px

.x-table-header_row
    .x-table-td-fixed_left,
    .x-table-td-fixed_right
        background-color var(--grey-100)
        &:before
            background-color var(--grey-100)

.x-header-col
    font-size 14px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
</style>
