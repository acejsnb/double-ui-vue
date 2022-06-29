import './style.styl';
import { PropType, defineComponent, reactive, ref, watch, toRaw } from 'vue';
import DropTrigger from '@/components/dropTrigger/DropTrigger';
import { Item, IState } from './types';

import AddClassNameForText, { GetSameItem } from './depend/AddClassNameForText';
import Drop, { Instance } from './depend/Drop';

const Select = defineComponent({
    name: 'DSelect',
    props: {
        width: {
            type: [String, Number],
            default: '120'
        },
        // 下拉弹窗宽
        dropWidth: {
            type: [String, Number],
            default: '120'
        },
        // 触发器标题
        caption: {
            type: String,
            default: ''
        },
        // 占位内容
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 是否隐藏清除按钮
        clearHide: {
            type: Boolean,
            default: false
        },
        // 开启搜索 - 默认可搜索
        openSearch: {
            type: Boolean,
            default: true
        },
        // 默认为false 居左对齐
        alignRight: {
            type: Boolean,
            default: false
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: [String, Array]
        },
        data: {
            type: Array as PropType<Item[]>,
            default: (): Item[] => [],
            required: true
        },
        // 容纳最大数量
        maxCount: {
            type: [String, Number],
            default: 5
        },
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function,
            default: () => {}
        }
    },
    emits: ['update:modelValue', 'change'],
    // emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const state = reactive<IState>({
            activeClose: true, // 激活关闭
            dropShow: false, // 下拉列表显示
            dropData: [], // 下拉列表数据
            selectedData: [], // 选中的数据
            searchData: [] // 搜索的数据
        });
        const dropTrigger = ref(null);

        let dropBox: Instance;

        watch(
            () => props.modelValue,
            (n, o) => {
                const { multiple, data } = props;
                let selectedData: Item | Item[];
                let dropData;
                if (multiple) {
                    const nVal = String(n);
                    const oVal = String(o);
                    if (nVal === oVal) return;
                    selectedData = data.filter((d) => n.includes(d.id));
                    dropData = data.map((d) => {
                        if (n.includes(d.id)) d.checked = 'checked';
                        else d.checked = 'uncheck';
                        return d;
                    });
                    state.dropData = dropData;
                } else {
                    if (n === o) return;
                    selectedData = data.find((d) => d.id === n);
                }
                state.selectedData = selectedData;
                if (dropBox) {
                    dropBox.vm.component.props.selectedId = n;
                    if (multiple) dropBox.vm.component.props.data = dropData;
                }
            },
            { deep: true, immediate: true }
        );
        watch(
            () => props.data,
            (n) => {
                const { multiple, modelValue } = props;
                const nData = JSON.stringify(n);
                const dropData = JSON.parse(nData);
                if (multiple) {
                    dropData.forEach((d: Item) => {
                        if (modelValue.includes(d.id)) d.checked = 'checked';
                        else d.checked = 'uncheck';
                    });
                }
                state.dropData = dropData;
                if (dropBox) dropBox.vm.component.props.data = dropData;
            },
            { deep: true, immediate: true }
        );

        // 改变下拉列表显示状态
        const changeDropShow = (status: boolean) => {
            state.dropShow = status;
            if (status) dropBox.resetPosition();
        };
        // 展开下拉列表
        const openDropHandle = (flag: string) => {
            const { disabled } = props;
            const { dropShow } = state;
            if (disabled) return;
            if (flag === 'triangle' && dropShow) {
                changeDropShow(false);
                return;
            }
            if (dropBox) {
                changeDropShow(true);
            } else {
                const {
                    width,
                    dropWidth,
                    multiple,
                    alignRight,
                    modelValue: selectedId,
                    maxCount
                } = props;
                const { dropData: data } = state;
                dropBox = Drop({
                    tag: dropTrigger.value,
                    props: {
                        parentState: state,
                        width: dropWidth < width ? width : dropWidth,
                        multiple,
                        alignRight,
                        data,
                        selectedId,
                        maxCount,
                        change(item: Item) {
                            state.selectedData = item;
                            if (item instanceof Array) {
                                const ids = item.map((d) => d.id);
                                emit('update:modelValue', ids);
                                emit(
                                    'change',
                                    ids,
                                    item.map((d) => toRaw(d))
                                );
                            } else {
                                emit('update:modelValue', item.id);
                                emit('change', item.id, toRaw(item));
                            }
                            changeDropShow(false);
                        },
                        cancel() {
                            changeDropShow(false);
                        }
                    }
                });

                changeDropShow(true);
            }
        };
        // 获取input输入的值
        const getInputText = (val: string) => {
            if (val) {
                const { dropData } = state;
                if (!dropData || !dropData.length) return;
                const searchData = JSON.parse(JSON.stringify(dropData)).filter((d: Item) => {
                    if (!d.disabled && GetSameItem(d.name, val)) {
                        d.name = AddClassNameForText(d.name, val, 'd-drop-option-text-highlight');
                        return d;
                    }
                    return null;
                });
                state.searchData = searchData;
                if (dropBox) dropBox.vm.component.props.data = searchData;
            } else {
                state.searchData = [];
                if (dropBox) dropBox.vm.component.props.data = state.dropData;
            }
        };
        // 触发器清除按钮
        const delHandle = () => {
            state.selectedData = [];
            if (props.multiple) {
                emit('update:modelValue', '');
                emit('change', '', {});
            } else {
                emit('update:modelValue', []);
                emit('change', [], []);
            }
            if (dropBox) {
                // @ts-ignore
                dropBox.vm.type.state.selectedData = [];
                // @ts-ignore
                dropBox.vm.type.state.selectedDataHistory = [];
            }
        };

        return () => {
            const {
                caption,
                width,
                placeholder,
                disabled,
                clearHide,
                openSearch,
                multiple,
                errorText,
                errorShow
            } = props;
            const { selectedData, dropShow } = state;

            return (
                <div class="d-select" ref={dropTrigger}>
                    <DropTrigger
                        caption={caption}
                        width={width}
                        placeholder={placeholder}
                        disabled={disabled}
                        clearHide={clearHide}
                        openSearch={openSearch}
                        multiple={multiple}
                        dropShow={dropShow}
                        errorText={errorText}
                        errorShow={errorShow}
                        selectedData={selectedData}
                        onGetInputText={getInputText}
                        onClick={openDropHandle}
                        delHandle={delHandle}
                    />
                </div>
            );
        };
    }
});

export default Select;
