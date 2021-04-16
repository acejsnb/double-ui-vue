import './style.styl';
import {
    defineComponent, reactive, ref, watch, onBeforeUnmount, toRaw
} from 'vue';

import DropTrigger from '../dropTrigger/DropTrigger';
import ClickOutside from '../static/utils/ClickOutside';
import AddClassNameForText, { GetSameItem } from './depend/AddClassNameForText';
import Drop from './depend/Drop';

const Select = defineComponent({
    name: 'Select',
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
        // 错误信息提示
        errorText: {
            type: String,
            default: ''
        },
        // 错误信息显示状态
        errorShow: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const state = reactive({
            activeClose: true, // 激活关闭
            dropShow: false, // 下拉列表显示
            dropData: [], // 下拉列表数据
            selectedData: [], // 选中的数据
            searchData: [] // 搜索的数据
        });
        const dropTrigger = ref(null);

        let dropBox;

        watch(() => props.modelValue, (n, o) => {
            const { multiple, data } = props;
            let selectedData, dropData;
            if (multiple) {
                const nVal = String(n),
                    oVal = String(o);
                if (nVal === oVal) return;
                selectedData = data.filter(d => n.includes(d.id));
                dropData = data.map(d => {
                    if (n.includes(d.id)) d.checked = 'checked';
                    else d.checked = 'uncheck';
                    return d;
                });
                state.dropData = dropData;
            } else {
                if (n === o) return;
                selectedData = data.find(d => d.id === n) || {};
            }
            state.selectedData = selectedData;
            if (dropBox) {
                dropBox.component.props.selectedId = n;
                if (multiple) dropBox.component.props.data = dropData;
            }
        }, { deep: true, immediate: true });
        watch(() => props.data, (n) => {
            const { multiple, modelValue } = props,
                nData = JSON.stringify(n);
            // oData = JSON.stringify(o);
            // if (nData === oData) return;
            const dropData = JSON.parse(nData);
            if (multiple) {
                dropData.forEach(d => {
                    if (modelValue.includes(d.id)) d.checked = 'checked';
                    else d.checked = 'uncheck';
                });
            }
            state.dropData = dropData;
            if (dropBox) dropBox.component.props.data = dropData;
        }, { deep: true, immediate: true });

        // 改变下拉列表显示状态
        const changeDropShow = (status) => {
            state.dropShow = status;
            if (status) dropBox.resetPosition();
            else dropBox.setShow(false);
        };
        // 点击下拉弹窗意外区域
        const clickOutSide = (e) => {
            const { activeClose, dropShow } = state,
                dom = dropBox.el;
            if (!activeClose || !dropShow) return;
            ClickOutside(e, dom, () => {
                if (dropBox) changeDropShow(false);
            });
        };
        // 展开下拉列表
        const openDropHandle = (flag) => {
            const { disabled } = props,
                { dropShow } = state;
            if (disabled) return;
            if (flag === 'triangle' && dropShow) {
                changeDropShow(false);
                return;
            }
            if (dropBox) {
                changeDropShow(true);
            } else {
                const {
                        width, dropWidth, multiple, alignRight, modelValue: selectedId, maxCount
                    } = props,
                    { dropData: data } = state;
                dropBox = Drop({
                    tag: dropTrigger.value,
                    propsData: {
                        width: (dropWidth < width ? width : dropWidth),
                        multiple,
                        alignRight,
                        data,
                        selectedId,
                        maxCount,
                        change(item) {
                            state.selectedData = item;
                            if (item instanceof Array) {
                                const ids = item.map(d => d.id);
                                emit('update:modelValue', ids);
                                emit('change', ids, item.map(d => toRaw(d)));
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

                window.addEventListener('click', clickOutSide, false);
            }
        };
        // 鼠标移入
        const triggerEnter = () => {
            if (props.disabled) return;
            state.activeClose = false;
        };
        // 鼠标移出
        const triggerLeave = () => {
            state.activeClose = true;
        };
        // 获取input输入的值
        const getInputText = (val) => {
            if (val) {
                const { dropData } = state;
                if (!dropData || !dropData.length) return;
                const searchData = JSON.parse(JSON.stringify(dropData)).filter(d => {
                    if (!d.disabled && GetSameItem(d.name, val)) {
                        d.name = AddClassNameForText(d.name, val, 'm-drop-option-text-highlight');
                        return d;
                    }
                    return null;
                });
                state.searchData = searchData;
                if (dropBox) dropBox.component.props.data = searchData;
            } else {
                state.searchData = [];
                if (dropBox) dropBox.component.props.data = state.dropData;
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
                dropBox.type.state.selectedData = [];
                dropBox.type.state.selectedDataHistory = [];
            }
        };

        onBeforeUnmount(() => {
            window.removeEventListener('click', clickOutSide);
            if (dropBox) dropBox.remove(dropBox);
        });

        return () => {
            const {
                    caption, width, placeholder, disabled, clearHide, openSearch, multiple, errorText, errorShow
                } = props,
                { selectedData, dropShow } = state;

            return (
                <div class="m-select"
                    ref={dropTrigger}
                    onMouseenter={triggerEnter}
                    onMouseleave={triggerLeave}
                >
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
                        onDelHandle={delHandle}
                    />
                </div>
            );
        };
    }
});

export default Select;
