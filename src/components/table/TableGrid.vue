<template>
    <div
        ref="tableGridRef"
        :class="['x-table-grid', border ? 'x-table-grid_border' : 'x-table-grid_normal']"
    >
        <!--表头-->
        <div
            ref="headerRef"
            class="x-table-container x-table-container_header x-table-scroll_0"
            @wheel.prevent
        >
            <TableHeader
                :width="tableWidth"
                :cols-width="colsWidth"
                :data="column"
                :scroll-left-value="scrollLeftValue"
                :fixed-right="fixedRight"
            />
        </div>
        <!--表体-->
        <div class="x-table-main_body">
            <div
                ref="bodyRef"
                class="x-table-container x-table-container_body x-table-scroll_0"
                :style="styleHeight"
                @scroll="bodyScrollHandle"
            >
                <TableBody
                    ref="tableBodyRef"
                    :width="tableWidth"
                    :cols-width="colsWidth"
                    :column="column"
                    :data="data"
                    :scroll-left-value="scrollLeftValue"
                    :fixed-right="fixedRight"
                >
                    <template
                        v-for="k in Object.keys(slots)"
                        #[k]="{body}"
                        :key="k"
                    >
                        <slot
                            :name="k"
                            :item="body"
                        />
                    </template>
                </TableBody>
            </div>
            <!--表体竖向滚动条-->
            <div
                v-if="styleHeight"
                ref="bodyVerticalBarRef"
                class="x-table-scroll_body"
                :style="styleHeight"
                @scroll="barScrollBodyHandle"
            >
                <div
                    class="x-table-scrollbar_body"
                    :style="styleScrollHeight"
                />
            </div>
            <i
                v-if="loading"
                class="x-table-loading_body"
            >
                <LoadingGreySvg />
            </i>
        </div>
        <!--横向滚动条-->
        <div
            ref="horizontalBarRef"
            class="x-table-scroll"
            @scroll="barScrollHandle"
        >
            <div
                class="x-table-scrollbar"
                :style="tableWidth && {width: `${tableWidth}px`}"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    useSlots, computed, ref, watch, nextTick
} from 'vue';
import LoadingGreySvg from '@/assets/iconSvg/loading_grey.svg';

import {ColWidthItem, ColumnItem, DataItem} from './type';
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import setColsWidth from './utils/setColsWidth';
import useScroll from './useCustom/useScroll';
import setBodyData from '@/components/table/utils/setBodyData';

interface Props {
    column: ColumnItem[]
    data: DataItem[]
    border?: boolean
    loading?: boolean
    width?: number
    height?: number
}

const props = withDefaults(defineProps<Props>(), {
    column: () => [],
    data: () => [],
    border: false,
    loading: false,
    width: 0,
    height: 0
});

// 插槽
const slots = useSlots();

// 表体高
const styleHeight = computed(() => (props.height ? {height: `${props.height}px`} : null));

// 列宽
const colsWidth = ref<ColWidthItem[]>([]);
// 最小宽度
const tableWidth = ref(0);
// 表格 根DOM
const tableGridRef = ref<HTMLDivElement>(null);
watch([() => props.column, () => props.width, () => props.border], ([column, width, border]) => {
    if (!column.length) return;
    nextTick(() => {
        const {cols = [], tw = 0} = setColsWidth(column, width, border, tableGridRef) || {};
        colsWidth.value = cols;
        tableWidth.value = tw;
    });
}, {immediate: true});

// 滚动条handle
const {
    scrollLeftValue,
    headerRef,
    bodyRef,
    bodyVerticalBarRef,
    horizontalBarRef,
    bodyScrollHandle,
    barScrollBodyHandle,
    barScrollHandle
} = useScroll();

const tableBodyRef = ref(null);
// 右侧固定列
const fixedRight = computed(() => {
    const tableClientWidth = tableGridRef.value?.clientWidth ?? 0; // 表格视宽
    return (
        (tableClientWidth + scrollLeftValue.value <
            (tableBodyRef.value?.instance.clientWidth ?? 0)) ||
        (!scrollLeftValue.value && tableClientWidth < tableWidth.value)
    );
});

// 表体数据
const bodyData = ref<DataItem[]>([]);
// 滚动条高
const styleScrollHeight = ref({height: '0'});
watch(() => props.data, (n) => {
    const len = n.length;
    if (!len) return;
    /* nextTick(() => {
        styleScrollHeight.value = {
            height: `${tableBodyRef.value?.instance.clientHeight ?? props.height ?? 0}px`
        };
    }); */
    bodyData.value = setBodyData(len, n);
    styleScrollHeight.value = {height: `${len * 48 + len - 1}px`};
}, {immediate: true});

</script>

<style lang="stylus">
.x-table-grid
    position relative
    width 100%
    font-size 0
    overflow hidden

    &:hover
        .x-table-scroll,
        .x-table-scroll_body
            opacity 1

.x-table-scroll_0
    &::-webkit-scrollbar
        opacity 0
        width 0
        height 0

/*.x-table-col
    padding-top 8px
    padding-bottom 8px*/
.x-table-grid_normal
    .x-table-col
        padding-left 8px
        padding-right @padding-left

.x-table-grid_border
    border 1px solid var(--grey-300)

    .x-table-tr
        .x-table-td
            + .x-table-td
                border-left 1px solid var(--grey-300)

    .x-table-col
        padding-left 16px
        padding-right @padding-left

// hover改变背景色
.x-table-tr
    transition background-color .2s

    &:hover
        background-color var(--grey-100)

        .x-table-td-fixed_left,
        .x-table-td-fixed_right
            background-color var(--grey-100)

            &:before
                background-color var(--grey-100)

.x-table-container
    width 100%

.x-table-container_header
    border-bottom 1px solid var(--grey-300)
    height 40px
    overflow-x auto
    overflow-y hidden

.x-table-main_body
    position relative
    width 100%

.x-table-container_body
    width 100%
    overflow auto

// 表体竖向滚动条
.x-table-scroll_body
    position absolute
    top 0
    right 0
    width 6px
    overflow-x hidden
    overflow-y auto
    opacity 0
    transition opacity .2s
    z-index 3

    .x-table-scrollbar_body
        width 6px

// 横向滚动条
.x-table-scroll
    position absolute
    left 0
    bottom 0
    width 100%
    overflow-x auto
    overflow-y hidden
    height 6px
    opacity 0
    transition opacity .2s
    z-index 3

    .x-table-scrollbar
        width 100%
        height 6px

// 固定列样式
.x-table-td-fixed_left, .x-table-td-fixed_right
    position sticky
    z-index 2
    transition background-color .2s

    &:before
        position absolute
        top 0
        bottom 0
        content ''
        display inline-block
        width 10px
        touch-action none
        pointer-events none
        overflow hidden
        transition background-color .2s

.x-table-td-fixed_left
    left 0

    &:before
        right 0
        box-shadow var(--table-fixed-box-shadow-right)

.x-table-td-fixed_right
    right 0

    &:before
        left 0
        box-shadow var(--table-fixed-box-shadow-left)

// 表体loading
.x-table-loading_body
    position absolute
    left 0
    top 0
    display flex
    align-items center
    justify-content center
    background-color var(--theme)
    width 100%
    height 100%
    z-index 4

    svg
        width 32px
        height 32px
</style>
