import './style.styl';

import {
    defineComponent, ref, reactive, watch, nextTick, onMounted, onBeforeUnmount
} from 'vue';
import SettingSvg from '../static/iconSvg/setting.svg';

import FormatColumns from './utils/FormatColumns';

import Grid from './grid/Grid';
import SettingDrop from './settingDrop';

const Table = defineComponent({
    name: 'Table',
    props: {
        width: {
            type: [String, Number],
            default: ''
        },
        height: {
            type: [String, Number],
            default: '280'
        },
        border: {
            type: Boolean,
            default: false
        },
        // 列最小宽度
        colMinWidth: {
            type: [Number, String],
            default: '120'
        },
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        // 设置可拖动排序
        draggable: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const refTable = ref(null);
        const refHead = ref(null);
        const refBody = ref(null);
        const tableSetting = ref(null);
        const state = reactive({
            settingStatus: false, // HeaderSetting显示状态
            hasScrollBar: false, // 是否有滚动条
            cols: [], // 列宽数据
            totalWidth: 0, // 总宽度
            xHidden: false, // body的横向滚动条隐藏
            columnsData: [] // 列数据
        });

        let resizeTimer = null, // 列宽定时器名字
            settingVm = null; // 设置实例
        // 设置列宽
        const setCols = (columns) => {
            const len = columns.length,
                cols = [];
            // 是否有滚动条
            const hasScrollBar = refBody.value.scrollHeight > refBody.value.clientHeight;
            // 表格宽
            const pageWidth = refTable.value.clientWidth;
            // 表格实际宽
            const realWidth = pageWidth - (props.border ? (1 + len) : 0) - (hasScrollBar ? 6 : 0);
            // 列平均宽
            const average = Math.floor(realWidth / len);
            // 余数
            let remainder = realWidth % len;
            for (let i = 0; i < len; i++) {
                // colMinWidth
                const curW = average + (remainder > 0 ? 1 : 0),
                    trueW = curW < props.colMinWidth ? props.colMinWidth : curW;
                cols.push({ id: `${i}`, width: trueW });
                if (remainder > 0) remainder--;
            }
            state.cols = cols;
            state.hasScrollBar = hasScrollBar;
            state.totalWidth = pageWidth - (props.border ? 2 : 0) - (hasScrollBar ? 6 : 0);
            state.xHidden = false;
        };
        const resetCols = () => {
            state.xHidden = true;
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setCols(props.columns);
            }, 300);
        };
        onMounted(() => {
            window.addEventListener('resize', resetCols, false);
        });
        onBeforeUnmount(() => {
            if (resizeTimer) clearTimeout(resizeTimer);
            window.removeEventListener('resize', resetCols);
        });
        const setColumnsData = (columns) => {
            state.columnsData = FormatColumns(columns);
        };
        watch(() => props.columns, (nc) => {
            setColumnsData(nc);
            nextTick(() => {
                setCols(nc);
            });
        }, { deep: true, immediate: true });

        // body横向滚动
        const bodyScroll = (e) => {
            const { target: { scrollLeft } } = e;
            refHead.value.scrollLeft = scrollLeft;
        };

        // 点击设置
        const settingHandle = () => {
            settingVm = SettingDrop({
                tag: tableSetting,
                propsData: {
                    data: state.columnsData,
                    draggable: props.draggable,
                    // 状态改变
                    changeSettingStatus(status) {
                        state.settingStatus = status;
                    },
                    // 点击确定
                    checkedHandle(checkedData, currentData, flag) {
                        this.changeSettingStatus(false);
                        this.btnClick(flag);
                    },
                    // 点击三个按钮回调
                    btnClick(flag) {
                        if (flag !== 'reset') this.changeSettingStatus(false);
                        emit('btnClick', flag);
                    }
                }
            });
            nextTick(() => {
                settingVm.resetPosition();
            });
        };

        return ({
            height, border, data
        }) => {
            const {
                cols, hasScrollBar, totalWidth, xHidden, columnsData
            } = state;
            return (
                <div class="m-table" ref={refTable}>
                    {/* 主表 */}
                    <div class={['m-table-main', border && 'm-table-main-border']}>
                        <div class="m-table-content m-table-thead-box"
                            class={{ 'm-table-thead-padding': hasScrollBar }}>
                            <div class="m-table-thead" ref={refHead}>
                                <Grid key="thead" tag="thead" width={totalWidth} border={border} cols={cols} columns={columnsData} data={data}/>
                            </div>
                            <div class="m-table-setting" ref={tableSetting} onClick={settingHandle}><SettingSvg/></div>
                        </div>
                        <div ref={refBody}
                            class="m-table-content m-table-tbody"
                            class={{ 'm-table-tbody-x': xHidden }}
                            style={{ maxHeight: `${height}px` }}
                            onScroll={bodyScroll}
                        >
                            <Grid key="tbody" tag="tbody" width={totalWidth} border={border} cols={cols} columns={columnsData} data={data} />
                        </div>
                    </div>
                    {/* 左侧固定表 */}
                    {/* <div class="m-table-left"><Grid key="left" border /></div> */}
                    {/* 右侧固定表 */}
                    {/* <div class="m-table-right"><Grid key="right" border /></div> */}
                </div>
            );
        };
    }
});

export default Table;
