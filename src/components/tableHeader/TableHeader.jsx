import './style.styl';

import { defineComponent } from 'vue';

import Checkbox from '../checkbox/Checkbox';
import HeaderItemContent from './depend/HeaderItemContent';

const TableHeader = defineComponent({
    name: 'TableHeader',
    props: {
        width: {
            type: [String, Number],
            default: ''
        },
        header: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        colWidth: {
            type: Array,
            default: () => []
        },
        // 开启操作栏
        rowTools: {
            type: Object,
            default: () => ({
                open: false, width: 0, fixed: '', event: ''
            })
        },
        // 开启checkbox
        checkbox: {
            type: Boolean,
            default: false
        },
        // 选中状态
        checked: {
            type: String,
            default: 'uncheck'
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 设置
        setting: {
            type: Boolean,
            default: false
        },
        // 显示所有边框
        border: {
            type: Boolean,
            default: false
        },
        // 是否禁用排序
        disableSort: {
            type: Boolean,
            default: false
        },
        // 后端排序
        sortAjax: {
            type: Boolean,
            default: false
        },
        // 表体是否是树形结构
        isTree: {
            type: Boolean,
            default: false
        },
        // 固定条宽
        scrollBar: {
            type: [String, Number],
            default: 4
        },
        // 显示行号
        rowNumber: {
            type: Boolean,
            default: false
        },
        // 行号名字
        rowNumberName: {
            type: [Number, String],
            default: '#'
        },
        // header - 多维度数据
        dimension: {
            type: Boolean,
            default: false
        },
        // 分组展示
        groupName: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        // 选中
        const checkHandle = (status) => {
            emit('selectedAll', status);
        };
        // 拖动改变宽度-鼠标按下
        const resizeDown = (e) => {
            const { x, target: { dataset: { ind } } } = e;
            emit('resizeDown', x, ind);
        };
        return () => {
            const {
                setting, border, width, rowNumber, rowNumberName, checkbox, colWidth, data, checked, disabled, dimension, disableSort, rowTools
            } = props;
            return <table class={['p-table-header', setting && 'p-table-header-setting', border && 'p-table-header-border']}
                cellspacing="0" cellpadding="0" border="0"
                style={{ width: `${width}px` }}
            >
                <colgroup>
                    {rowNumber && <col width="68"/>}
                    {checkbox && <col width="48"/>}
                    {
                        colWidth.map(w => (<col width={w} key={w}/>))
                    }
                </colgroup>
                <thead>
                    <tr class="p-table-header-content">
                        {rowNumber && <th class="p-table-header-item-row-number">{rowNumberName}</th>}
                        {checkbox && data.length && <th class={{ 'p-table-header-th': true, 'p-table-header-th-bl': rowNumber }}>
                            <div className="p-table-header-item-checkbox">
                                <Checkbox checked={checked} disabled={disabled} onChange={checkHandle}/>
                            </div>
                        </th>}
                        {
                            data.map((header, hi) => (
                                <th class={['p-table-header-th', ((hi === 0 && (checkbox || rowNumber)) || (border && hi > 0)) && 'p-table-header-th-bl']}
                                    key={header.key}>
                                    <div class={[
                                        'p-table-header-item',
                                        dimension ? 'p-table-header-item-dimension' : 'p-table-header-item-normal',
                                        header.align && `p-table-header-item-${header.align}`
                                    ]}>
                                        <div class={[
                                            'p-table-header-item-content',
                                            dimension && header.children && JSON.stringify(header.children).length > 4
                                                ? 'p-table-header-item-content-h-child'
                                                : 'p-table-header-item-content-n-child'
                                        ]}>
                                            <HeaderItemContent index={hi} header={header} colWidth={colWidth} border={border} disableSort={disableSort}/>
                                            {(dimension && header.children && JSON.stringify(header.children).length > 4) && (
                                                <div class="p-table-header-item-children">
                                                    {
                                                        header.children.map((cHeader, cHi) => (
                                                            <HeaderItemContent key={cHeader.key}
                                                                isChild={true} index={cHi} header={cHeader}
                                                                colWidth={colWidth} border={border} disableSort={disableSort}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        {/* 拖动改变宽度 */}
                                        {header.resizable && (
                                            <section class="p-table-resize-width" data-ind={hi} onMousedown={resizeDown}/>
                                        )}
                                    </div>
                                </th>
                            ))
                        }
                        {rowTools.open && (
                            <th class={['p-table-header-th', border && 'p-table-header-th-bl']}>
                                <div class={[
                                    'p-table-header-item',
                                    dimension ? 'p-table-header-item-dimension' : 'p-table-header-item-normal',
                                    rowTools.align && `p-table-header-item-${rowTools.align}`
                                ]}>
                                    <div class="p-table-header-item-content p-table-header-item-content-n-child">
                                        <section class="p-table-header-text">
                                            <span class="p-table-header-span">{rowTools.text || '操作'}</span>
                                        </section>
                                    </div>
                                </div>
                            </th>
                        )}
                    </tr>
                </thead>
            </table>;
        };
    }
});

export default TableHeader;
