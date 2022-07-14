<template>
    <table
        ref="bodyRef"
        class="x-table-body"
        :style="width && { width: `${width}px` }"
    >
        <colgroup>
            <col
                v-for="c in colsWidth"
                :key="c.id"
                :width="c.w"
            >
        </colgroup>
        <tbody>
            <tr
                v-for="d in data"
                :key="d.id"
                class="x-table-tr x-table-body_row"
            >
                <td
                    v-for="h in column"
                    :key="h.key"
                    class="x-table-td"
                    :class="[
                        (h.fixed === 'left' && scrollLeftValue) && 'x-table-td-fixed_left',
                        (h.fixed === 'right' && fixedRight) && 'x-table-td-fixed_right'
                    ]"
                >
                    <template v-if="h.slot">
                        <slot
                            :name="h.key"
                            :body="toRaw(d)"
                        />
                    </template>
                    <div
                        v-else
                        class="x-table-col x-body-col"
                    >
                        <span
                            class="x-body-text"
                            @mouseenter="setHtmlTagTitle"
                        >{{ d[h.key] }}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import { toRaw, ref } from 'vue';
import { textEllipsis } from 'js-func-tools';
import { ColumnItem, DataItem, ColWidthItem } from './type';

interface Props {
    width: number
    scrollLeftValue: number
    fixedRight: boolean
    colsWidth: ColWidthItem[]
    column: ColumnItem[]
    data: DataItem[]
}

const props = withDefaults(defineProps<Props>(), {
    width: 0,
    scrollLeftValue: 0,
    fixedRight: false,
    colsWidth: () => [],
    column: () => [],
    data: () => []
});

// 设置标签title
const setHtmlTagTitle = (e: MouseEvent) => textEllipsis(e);

const bodyRef = ref<HTMLElement>(null);
// 提供给父组件使用
defineExpose({
    instance: bodyRef
});

</script>

<style lang="stylus">
.x-table-body
    display table
    table-layout fixed
    color var(--grey-900)
    width 100%
.x-table-body_row
    height 48px
    + .x-table-body_row
        border-top 1px solid var(--grey-300)
.x-body-text
    font-size 14px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

.x-table-body_row
    .x-table-td-fixed_left,
    .x-table-td-fixed_right
        background-color var(--theme)
        &:before
            background-color var(--theme)
.x-body-col
    display flex
    align-items center
    width 100%
    height 48px
    overflow hidden
</style>
