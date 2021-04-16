import './style.styl';
import { defineComponent, reactive, watch } from 'vue';

import ArrowTriangle from '../static/iconSvg/arrow_triangle.svg';
import MorePointSvg from '../static/iconSvg/morePoint.svg';
import Checkbox from '../checkbox/Checkbox';

import TextEllipsis from '../static/utils/TextEllipsis';

import {
    OpenNode,
    SetChecked,
    SetCheckedSortByTree,
    SetTileCheckedInit,
    SetTileListStatus,
    TileTool,
    StrategyChange
} from './TreeHandle';

// Dropdown数据
const dropdownData = [
    { id: 'allChild', name: '选择所有子级' },
    { id: 'nextChild', name: '选择下一级' },
    { id: 'cancelAll', name: '取消所有子级' }
];

const Tree = defineComponent({
    name: 'Tree',
    props: {
        modelValue: {
            type: [String, Number, Array],
            default: ''
        },
        // 静态数据
        data: {
            type: Array,
            default: () => []
        },
        // 是否开启多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 所有checkbox是否显示
        allCheckboxShow: {
            type: Boolean,
            default: true
        },
        // 是否返回半选
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否上下级联动
        linkage: {
            type: Boolean,
            default: true
        },
        // 只能选择末级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 父级选中子级禁用，子级选中不影响父级 (当此值为true时，returnParentNode为false不生效)
        childDisable: {
            type: Boolean,
            default: false
        },
        // 是否返回父对象数据
        includeParent: {
            type: Boolean,
            default: true
        },
        // 可选面板是否拼接父级name
        jointParent: {
            type: Boolean,
            default: false
        },
        // 是否存在相同的参数
        sameParams: {
            type: Boolean,
            default: false
        },
        // 自定义渲染内容
        render: {
            type: String,
            default: ''
        },
        // 显示更多操作
        omit: {
            type: Boolean,
            default: false
        },
        // 按照树形结构排序选中的数据
        sortByTree: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const state = reactive({
            // 平铺列表
            tileList: [],
            // 平铺列表历史数据
            tileListHistory: [],
            // 当前选中的id
            currentId: null,
            // 选中的数据
            checkedData: []
        });

        const setTileListStatus = async (status) => {
            const { linkage, childDisable } = props,
                { tileList } = state;
            const tileData = await SetTileListStatus(status, tileList, { linkage, childDisable });
            state.tileList = tileData;
            if (status === 'uncheck') state.checkedData = [];

            emit('changeTileData', tileData);
        };
        // 获取列表显示的数量
        const treeShowHandle = (data) => {
            const num = data?.filter(d => d.show).length;
            emit('treeShowHandle', num);
        };
        // 设置为历史数据 status取值[setHistory, 'recoverHistory']
        const resetTileList = (status) => {
            const { tileList, tileListHistory } = state;
            const strategy = {
                // 设置历史数据
                setHistory() {
                    state.tileListHistory = JSON.parse(JSON.stringify(tileList));
                },
                // 恢复为历史数据
                recoverHistory() {
                    const tile = JSON.parse(JSON.stringify(tileListHistory));
                    state.tileList = tile;
                    emit('changeTileData', tile);
                }
            };
            strategy[status]();
        };
        // 设置数据
        const setTileList = async (data, value = null) => {
            state.currentId = value;
            const strData = JSON.stringify(data);
            if (strData.length <= 4) {
                state.tileList = [];
            } else {
                const nData = JSON.parse(strData);
                const tile = await TileTool([], nData, '-1', null, false, props),
                    { tileData, checkedData } = await SetTileCheckedInit(tile, props);
                state.tileList = tileData;
                state.checkedData = checkedData;
                treeShowHandle(tileData);
                resetTileList('setHistory');
                // 初始化返回平铺数据列表
                emit('changeTileData', tileData, true);
            }
        };
        watch(() => props.data, (n) => {
            setTileList(n, props.modelValue).then();
        }, { deep: true, immediate: true });
        watch(() => props.modelValue, (n) => {
            state.currentId = n;
            setTileList(props.data, n).then();
        }, { deep: true });

        // 点击每项 status=true表示需要向父级提交数据并带确定操作
        const itemClick = (item, status) => {
            const {
                    multiple, sameParams, sortByTree, render
                } = props,
                { tileList } = state,
                curItem = JSON.parse(JSON.stringify(item)),
                {
                    id, sameId, disabled, showCheckbox, checked
                } = curItem;
            if (disabled || (multiple && !render && !showCheckbox)) return;
            const strategy = {
                // 多选
                true() {
                    const lists = sameParams ? tileList.map(d => {
                        const {
                            sameId: dSameId, defaultDisabled, disabled: dDisabled, id: dId
                        } = d;
                        if (sameId && dSameId && !defaultDisabled && !dDisabled && dId !== id && dSameId === sameId) {
                            d.disabled = checked !== 'checked';
                        }
                        return d;
                    }) : tileList;
                    const { tileData, checkedIds, checkedData } = sortByTree
                        ? SetCheckedSortByTree(curItem, lists)
                        : SetChecked(curItem, lists, props, state);
                    // const curItem = JSON.parse(JSON.stringify(item));
                    state.tileList = tileData;
                    state.checkedData = checkedData;
                    emit('change', {
                        item: curItem, checkedIds, checkedData
                    }, status); // 触发选中改变
                },
                // 单选
                false() {
                    state.currentId = id;
                    emit('change', curItem); // 点击的当前项
                }
            };
            strategy[multiple]();
        };
        // 展开子项
        const openNode = (e, item) => {
            e.stopPropagation();
            const { tileList } = state,
                { id, open } = item,
                status = !open;
            item.open = status;
            const tile = OpenNode(id, status, tileList);
            state.tileList = tile;
            emit('openNode', JSON.parse(JSON.stringify(item)));
            treeShowHandle(tile);
        };
        // 通过id改变选中状态 status=true表示需要向父级提交数据并带确定操作
        const changeTileList = itemClick;
        // 获取状态
        const getStatus = (status, item) => {
            const { tileList } = state;
            state.tileList = tileList.map(d => {
                if (d.id === item.id) d.omitStatus = status;
                return d;
            });
        };
        // 通过类型设置选中状态
        const strategyChange = (id, item) => {
            const { tileData, checkedIds, checkedData } = StrategyChange(id, item, props, state);
            state.checkedData = checkedData;
            state.tileList = tileData;
            emit('changeTileData', tileData);
            emit('change', {
                item, checkedIds, checkedData
            }, true);
        };
        // Dropdown选中状态改变回调
        const dropdownChange = (id, item) => {
            strategyChange(id, item);
        };

        return () => {
            const { multiple, render } = props,
                { tileList, currentId } = state;
            return (
                <div class="p-tree-com">
                    {
                        tileList.map((item, i) => (
                            <>
                                {
                                    item.show && (
                                        <div key={`${item.id}-${i}`}
                                            class={
                                                [
                                                    'p-tree-com-item',
                                                    (!multiple && currentId === item.id) && 'p-tree-com-current',
                                                    item.disabled && 'p-tree-com-disabled'
                                                ]
                                            }
                                            style={{ paddingLeft: `${item.paddingLeft}px` }}
                                        >
                                            <section class="p-tree-com-arrow">
                                                {
                                                    !item.lastNode && (
                                                        <ArrowTriangle class={{ 'p-tree-com-triangle': item.open }} onClick={(e) => openNode(e, item)} />
                                                    )
                                                }
                                            </section>
                                            <div class={['p-tree-com-main', multiple ? 'p-tree-com-multiple' : 'p-tree-com-single']}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    itemClick(item);
                                                }}
                                            >
                                                { item.showCheckbox && (<section class="p-tree-com-checkbox">
                                                    <Checkbox
                                                        disabled={item.disabled}
                                                        checked={item.checked}
                                                    />
                                                </section>) }
                                                <section class={{
                                                    'p-tree-com-content': true,
                                                    'p-tree-com-omit': item.omit
                                                }}>
                                                    {
                                                        render === 'custom'
                                                            ? slots[item.id]?.(item)
                                                            : <>
                                                                <article class="p-tree-com-text" onMouseenter={TextEllipsis}>{item.name}</article>
                                                                {
                                                                    item.omit && (
                                                                        <span class={
                                                                            { 'p-tree-com-point-svg': true, 'p-tree-com-point-svg-active': item.omitStatus }
                                                                        }
                                                                        onClick={e => e.stopPropagation()}
                                                                        >
                                                                            <Dropdown trigger="click"
                                                                                triangle={false}
                                                                                data={dropdownData}
                                                                                onGetStatus={status => getStatus(status, item)}
                                                                                onChange={id => dropdownChange(id, item)}
                                                                            >
                                                                                <MorePointSvg />
                                                                            </Dropdown>
                                                                        </span>
                                                                    )
                                                                }
                                                            </>
                                                    }
                                                </section>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        ))
                    }
                </div>
            );
        };
    }
});

export default Tree;
