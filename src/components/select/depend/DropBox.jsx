import {
    defineComponent, reactive, computed, watch, onMounted, Transition, createStaticVNode
} from 'vue';
import TextEllipsis from '../../static/utils/TextEllipsis';

import SelectCheckbox from '../../selectCheckbox/SelectCheckbox';

const DropBox = defineComponent({
    name: 'DropBox',
    props: {
        width: {
            type: [String, Number],
            default: ''
        },
        // 默认为true 居左对齐
        alignRight: {
            type: Boolean,
            default: true
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        // 选中的id
        selectedId: {
            type: [Number, String, Array]
        },
        data: {
            type: Array,
            default: () => []
        },
        // 容纳最大数量
        maxCount: {
            type: [String, Number],
            default: 5
        },
        // change事件
        change: {
            type: Function,
            default: () => {}
        },
        // 取消事件
        cancel: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const state = reactive({
            position: true, // 弹出方式
            dropShow: false, // 是否显示
            confirmDisable: true, // 确定按钮禁用
            selectedData: [], // 选中的数据
            selectedDataHistory: [] // 选中的历史数据
        });
        DropBox.state = state;

        const dropData = computed({
            get() {
                return props.data;
            },
            set(newData) {
                return newData;
            }
        });

        watch(() => state.dropShow, (n, o) => {
            if (n === o) return;
            const { confirmDisable, selectedDataHistory } = state;
            if (n || confirmDisable) return;
            setTimeout(() => {
                state.selectedData = JSON.parse(JSON.stringify(selectedDataHistory));
                state.confirmDisable = true;
                const ids = selectedDataHistory.map(d => d.id);
                dropData.value = props.data.map(d => {
                    if (ids.includes(d.id)) d.checked = 'checked';
                    else d.checked = 'uncheck';
                    return d;
                });
            }, 300);
        });

        onMounted(() => {
            const { multiple, data, selectedId = [] } = props;
            const selectedData = multiple ? data.filter(d => selectedId.includes(d.id)) : data.find(d => d.id === selectedId);
            if (selectedData) {
                state.selectedData = selectedData;
                state.selectedDataHistory = JSON.parse(JSON.stringify(selectedData));
            }
        });

        // 点击列表
        const optionHandle = (item) => {
            if (item.disabled) return;
            // this.selectedId = item.id;
            const obj = JSON.parse(JSON.stringify(item));
            obj.name = obj.name.replace(/<[^<>]+>/g, '');
            props.change(obj);
        };
        // 多选change回调
        const change = (selected, unselect) => {
            const { selectedData, selectedDataHistory } = state;
            let sd = [];
            if (JSON.stringify(selected).length > 4) {
                selectedData.push(selected);
                sd = selectedData;
            } else {
                sd = selectedData.filter(d => d.id !== unselect.id);
            }
            state.selectedData = sd;
            const cur = sd.map(d => d.id).sort().join(''),
                his = selectedDataHistory.map(d => d.id).sort().join('');
            state.confirmDisable = (cur || his) ? cur === his : (!cur || !his);
        };
        // 取消
        const cancel = () => {
            props.cancel();
        };
        // 确定
        const confirm = () => {
            const { confirmDisable, selectedData } = state;
            if (confirmDisable) return;
            state.selectedDataHistory = JSON.parse(JSON.stringify(selectedData));
            state.confirmDisable = true;
            props.change(selectedData);
        };

        return () => {
            const {
                    width, maxCount, multiple, selectedId
                } = props,
                { position, dropShow, confirmDisable } = state;

            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div v-show={dropShow}
                        class={
                            [
                                'm-drop-box',
                                `m-drop-box-shadow-${position ? 'bottom' : 'top'}`
                            ]
                        }
                        style={{ width: `${width}px` }}
                    >
                        <div class={[
                            'm-drop-box-content',
                            `m-drop-box-content-${maxCount <= 5 ? 'normal' : 'max'}`
                        ]}>
                            {
                                (dropData.value && dropData.value.length) ? (
                                    multiple ? (
                                        <SelectCheckbox
                                            textIndent={false}
                                            data={dropData.value}
                                            stopPropagation={true}
                                            onChange={change}
                                        />
                                    ) : (
                                        dropData.value.map((d, i) => (
                                            <div key={`${d.id}-${i}`}
                                                class={[
                                                    'm-drop-option',
                                                    d.id === selectedId && 'm-drop-option-selected',
                                                    d.disabled ? 'm-drop-option-disabled' : 'm-drop-option-normal'
                                                ]}
                                                onClick={() => optionHandle(d)}
                                            >
                                                <section class="m-drop-option-text"
                                                    onMouseenter={TextEllipsis}
                                                >{createStaticVNode(d.name)}</section>
                                            </div>
                                        ))
                                    )
                                ) : <div class="m-drop-option-none">没有找到任何内容</div>
                            }
                        </div>
                        {
                            multiple && (
                                <div class={['m-drop-handle', (dropData.value.length > maxCount) && 'm-drop-handle-shadow']}>
                                    <span class="m-drop-btn m-drop-btn-cancel" onClick={cancel}>取消</span>
                                    <span class={['m-drop-btn', confirmDisable ? 'm-drop-btn-disabled' : 'm-drop-btn-confirm']} onClick={confirm}>确定</span>
                                </div>
                            )
                        }
                    </div>
                </Transition>
            );
        };
    }
});

export default DropBox;
