import './style.styl';
import {
    defineComponent, reactive, watch, onMounted, createStaticVNode
} from 'vue';

import Checkbox from '../checkbox/Checkbox';
import GetTextHideWidth from '../static/utils/GetTextHideWidth';
import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';
import TextEllipsis from '../static/utils/TextEllipsis';
import CheckHtml from '../static/utils/CheckHtml';

const SelectCheckbox = defineComponent({
    name: 'SelectCheckbox',
    props: {
        /**
         * 下拉列表数据
         */
        data: {
            type: Array,
            default: () => []
        },
        // 父级选中子级禁用，子级选中不影响父级 (当此值为true时，returnParentNode为false不生效)
        childDisable: {
            type: Boolean,
            default: false
        },
        // 宽
        width: {
            type: [String, Number],
            default: 280
        },
        // 左侧显示省略号
        textIndent: {
            type: Boolean,
            default: true
        },
        // 阻止冒泡
        stopPropagation: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            scrollBar: 0, // 滚动条宽度
            selectData: []
        });

        onMounted(() => {
            state.scrollBar = GetScrollbarWidth();
        });

        const getTextWidth = (text = '') => {
            const reg = /<\/?.+?\/?>/g,
                { width } = props,
                maxWidth = width - 49;
            // 49 = 1 + 16 + 8 + 16 + 8
            return GetTextHideWidth(maxWidth, text.replace(reg, ''));
        };

        watch(() => props.data, (n) => {
            const { textIndent } = props;
            if (JSON.stringify(n).length < 4) return [];
            state.selectData = n.map(d => {
                if (textIndent) d.excess = -getTextWidth(d.name);
                return d;
            });
        }, { deep: true, immediate: true });

        const textEllipsis = (e, { excess, name }) => {
            const { textIndent } = props,
                reg = /<\/?.+?\/?>/g;
            if (textIndent) {
                if (excess) e.target.title = name.replace(reg, '');
            } else {
                TextEllipsis(e);
            }
        };
        // 移除某一个选中的
        const removeOption = (id) => {
            state.selectData = state.selectData.map(d => {
                if (d.id === id) d.checked = 'uncheck';
                return d;
            });
        };
        // 提交当前选择的值
        const optionClick = (id, checked) => {
            let selectedData = {},
                unselectData = {};
            state.selectData = state.selectData.map(d => {
                if (d.id === id && !d.disabled) {
                    d.checked = checked;
                    if (checked.startsWith('c')) selectedData = d;
                    else unselectData = d;
                }
                return d;
            });
            emit('change', selectedData, unselectData);
        };
        // checkbox选中改变
        const change = (checked, id) => {
            optionClick(id, checked);
        };

        return () => {
            const { data, stopPropagation } = props,
                { scrollBar, selectData } = state;

            return (
                <div class="p-select-checkbox" v-show={data && data.length}>
                    {
                        selectData.map((item, ind) => (
                            <div key={item.id}
                                class={{
                                    'p-select-checkbox-item': true,
                                    'p-select-checkbox-disabled': item.disabled
                                }}>
                                <Checkbox key={`${item.id}-${ind}`}
                                    v-model={[item.checked, 'checked']}
                                    disabled={item.disabled}
                                    stopPropagation={stopPropagation}
                                    attr={item.id}
                                    onChange={change}
                                >
                                    <span
                                        class={{
                                            'p-select-checkbox-text': true,
                                            'p-select-checkbox-text-ellipsis-start': item.excess
                                        }}
                                        style={{ textIndent: `${item.excess - (item.excess && scrollBar)}px` }}
                                        onMouseenter={e => textEllipsis(e, item)}
                                    >{CheckHtml(item.name) ? createStaticVNode(item.name) : item.name}</span>
                                </Checkbox>
                            </div>
                        ))
                    }
                </div>
            );
        };
    }
});

export default SelectCheckbox;
