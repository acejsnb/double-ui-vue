import './style.styl';
import {
    defineComponent, ref, reactive, watch, onBeforeUnmount
} from 'vue';

import Triangle from '../static/iconSvg/triangle.svg';
import DropOption from './depend/dropOption';

const Dropdown = defineComponent({
    name: 'Dropdown',
    props: {
        // 数据列表
        data: {
            type: Array,
            default: () => [],
            require: true
        },
        // 绑定的v-model值
        modelValue: {
            type: [String, Number],
            default: ''
        },
        // 最小宽度
        minWidth: {
            type: [String, Number],
            default: ''
        },
        maxWidth: {
            type: [String, Number],
            default: ''
        },
        // 是否显示右边三角形
        triangle: {
            type: Boolean,
            default: true
        },
        // 基于哪个父容器定位，可选值body、parent父级、p-modal-content当前触发器的某个class类名
        transfer: {
            type: String,
            default: 'parent'
        },
        // 主题
        theme: {
            type: String,
            default: 'light' // 可选值【light、dark】
        },
        // 通过点击或hover打开下拉列表
        trigger: {
            type: String,
            default: 'hover'
        },
        // 显示搜索
        openSearch: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请搜索'
        },
        // 居右对齐
        alignRight: {
            type: Boolean,
            default: false
        },
        // 显示右上角箭头
        arrow: {
            type: Boolean,
            default: false
        },
        // X轴偏移量
        translateX: {
            type: [String, Number],
            default: 0
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 下拉列表容纳最大条数
        maxCount: {
            type: [String, Number],
            default: 5
        }
    },
    setup(props, { slots, emit }) {
        const pDrop = ref(null);
        const state = reactive({
            // 三角形状态
            optionStatus: false,
            // 下拉弹窗显示
            dropShow: false,
            // 定时器名称
            dropTimer: null
        });

        let dOption = null;
        watch(() => props.modelValue, (n, o) => {
            if (n === o) return;
            if (dOption) dOption.component.props.modelValue = n;
        });
        watch(() => props.data, (n, o) => {
            if (n === o) return;
            if (dOption) dOption.component.props.data = n;
        });
        watch(() => state.optionStatus, (n, o) => {
            if (n === o) return;
            if (n) state.dropShow = true;
            else setTimeout(() => { state.dropShow = false; }, 300);
        });
        watch(() => state.dropShow, (n, o) => {
            if (n === o) return;
            emit('getStatus', n);
        });
        const setDropdownStatus = (status) => {
            state.optionStatus = status;
            if (dOption && status) dOption.resetPosition();
        };
        /**
         * 提交当前选择的值
         * @param id 返回值
         * @param name 返回值name
         */
        const optionClick = (id, name) => {
            emit('change', id, name);
            setDropdownStatus(false);
        };
        const openDrop = () => {
            const { data } = props;
            if (JSON.stringify(data).length <= 4) return;
            if (dOption) {
                setDropdownStatus(true);
            } else {
                dOption = DropOption({
                    tag: pDrop.value,
                    propsData: {
                        parent: state,
                        optionClick,
                        ...props
                    }
                });
                setDropdownStatus(true);
            }
        };
        const dropEnter = () => {
            const { disabled, trigger } = props,
                { optionStatus } = state;
            if (disabled) return;
            if (trigger === 'hover') {
                // 打开弹窗
                if (!optionStatus) openDrop();
            }
        };
        const dropLeave = () => {
            const { disabled, trigger } = props;
            if (disabled) return;
            if (trigger === 'hover' && dOption) {
                state.dropTimer = setTimeout(() => {
                    state.optionStatus = false;
                }, 300);
            }
        };
        const dropClick = (e) => {
            e.stopPropagation();
            const { disabled, trigger } = props,
                { optionStatus, dropShow } = state;
            if (disabled || dropShow) return;
            if (trigger === 'click' && !optionStatus) openDrop();
        };

        onBeforeUnmount(() => {
            if (dOption) dOption.remove();
        });

        return () => {
            const {
                    theme, dropShow, disabled, triangle
                } = props,
                { optionStatus } = state;
            return (
                <div class={['p-drop', `p-drop-${theme}`, dropShow && 'p-drop-show', disabled && 'p-drop-disabled']}
                    ref={pDrop}
                    onMouseenter={dropEnter}
                    onMouseleave={dropLeave}
                    onClick={dropClick}
                >
                    <section class="p-drop-title">
                        <article class="p-drop-title-content">
                            {slots.default()}
                        </article>
                        {triangle && <article class={['p-drop-triangle', !optionStatus && 'p-drop-triangle-rotate']}><Triangle/></article>}
                    </section>
                </div>
            );
        };
    }
});

export default Dropdown;
