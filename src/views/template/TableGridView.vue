<template>
    <div class="view-box">
        <!--        <h2 class="view-title">1.default</h2>
        <TableGrid
            border
            :column="column0"
            :data="data0"
        >
            <template #handle="{item}">
                <div class="cus-handle" @click="cusHandle(item)">编辑</div>
            </template>
        </TableGrid>
        <br><br><br>-->
        <h2 class="view-title">
            2.fixed + width
        </h2>
        <TableGrid
            :width="2000"
            :height="500"
            :column="column0"
            :data="data0"
        >
            <template #handle="{item}">
                <div
                    class="cus-handle"
                    @click="cusHandle(item)"
                >
                    编辑
                </div>
            </template>
        </TableGrid>
        <br><br><br>
    <!--        <h2 class="view-title">3.slot + width</h2>
        <div style="width: 500px">
            <TableGrid
                border
                :column="column"
                :data="data"
            >
                <template #handle="{item}">
                    <div class="cus-handle" @click="cusHandle(item)">编辑</div>
                </template>
            </TableGrid>
        </div>-->
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TableGrid from '@/components/table/TableGrid.vue';
import { ColumnItem, DataItem } from '@/components/table/type';
import {
    header0, bodyData0, headerData, bodyData, bodyData1
} from '@/static/tableGridData';

const column0 = ref<ColumnItem[]>(header0 as ColumnItem[]);
const data0 = ref<DataItem[]>([]);
const column = ref<ColumnItem[]>(headerData);
const data = ref<DataItem[]>(bodyData);

onMounted(() => {
    setTimeout(() => {
        // data0.value = bodyData0;
        data0.value = bodyData1;
    }, 2000);
});

const cusHandle = (item: DataItem) => {
    console.log(item);
};

</script>

<style lang="stylus">
.view-box
    padding 20px
    width 100%
.cus-handle
    padding-left 12px
    font-size 14px
    color var(--blue-500)
    cursor pointer
</style>
