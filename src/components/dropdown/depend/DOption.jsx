import {
    defineComponent, Transition, watch, getCurrentInstance, reactive, createStaticVNode
} from 'vue';
import ClearSvg from '../../static/iconSvg/clear2.svg';
import TextEllipsis from '../../static/utils/TextEllipsis';

const DOption = defineComponent({
    name: 'DOption',
    props: {
        parent: {
            type: Object,
            default: () => ({})
        },
        // 动画执行方向
        position: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: () => [],
            require: true
        },
        /**
         * 绑定的v-model值
         */
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
        // X周偏移量
        translateX: {
            type: [String, Number],
            default: 0
        },
        // 下拉列表容纳最大条数
        maxCount: {
            type: [String, Number],
            default: 5
        },
        // 提交当前选择的值
        optionClick: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const state = reactive({
            activeClose: true, // 激活关闭
            inputVal: '', // 搜索输入的值
            optionData: [], // 列表数据
            scrollTop: 0, // 滚动天距离顶部距离
            dropTimer: null // 定时器名称
        });
        state.optionData = JSON.parse(JSON.stringify(props.data));
        const { ctx } = getCurrentInstance();

        let timer;

        watch(() => props.parent.optionStatus, (n) => {
            if (n) {
                setTimeout(() => {
                    ctx.$el.style.pointerEvents = 'auto';
                    ctx.$el.focus();
                }, 300);
            } else {
                ctx.$el.style.pointerEvents = 'none';
            }
        });
        watch(() => props.data, (n, o) => {
            const nData = JSON.stringify(n),
                oData = JSON.stringify(o);
            if (nData === oData) return;
            state.optionData = JSON.parse(nData);
        }, { deep: true });

        const wheel = (e) => {
            e.stopPropagation();
        };

        const inputValue = (e) => {
            state.inputVal = e.target.value;
        };
        const inputDown = () => {
            state.activeClose = false;
        };
        // 搜索数据
        const searchHandle = (str) => {
            const data = JSON.parse(JSON.stringify(props.data));
            if (str) {
                state.optionData = data.filter(d => {
                    if (d.name.includes(str)) return d;
                    return null;
                });
            } else {
                state.optionData = data;
            }
        };
        watch(() => state.inputVal, (n, o) => {
            if (n === o) return;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                searchHandle(n);
            }, 300);
        }, { deep: true });
        // 清除输入的内容
        const clearInput = () => {
            state.inputVal = '';
        };
        /**
         * 提交当前选择的值
         * @param e event
         * @param id 返回值id
         * @param name 返回值name
         * @param disabled 是否禁用点击
         */
        const optionClick = (e, id, name, disabled) => {
            e.stopPropagation();
            if (disabled) return;
            props.optionClick(id, name);
        };
        const dropClose = () => {
            if (!state.activeClose) return;
            const { parent } = props;
            parent.optionStatus = false;
        };
        const dropEnter = () => {
            state.activeClose = false;
            if (props.parent.dropTimer) clearTimeout(props.parent.dropTimer);
            if (state.dropTimer) clearTimeout(state.dropTimer);
        };
        const dropLeave = () => {
            state.activeClose = true;
            ctx.$el.focus();
            const { trigger, parent } = props;
            if (trigger === 'hover') parent.dropTimer = setTimeout(dropClose, 300);
        };
        const scrollTopHandle = (e) => {
            state.scrollTop = e.target.scrollTop;
        };

        return () => {
            const {
                    parent: { optionStatus }, position, theme, arrow, minWidth, maxWidth, openSearch, placeholder, modelValue
                } = props,
                { scrollTop, inputVal, optionData } = state;
            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div v-show={optionStatus}
                        class={[
                            'p-drop-content',
                            `p-drop-content-${theme}`,
                            arrow && (position ? 'p-drop-content-top-arrow' : 'p-drop-content-bottom-arrow')
                        ]}
                        style={{
                            minWidth: `${minWidth}px`,
                            maxWidth: `${maxWidth}px`
                        }}
                        tabIndex="-1"
                        onWheel={wheel}
                        onBlur={dropClose}
                        onMouseenter={dropEnter}
                        onMouseleave={dropLeave}
                    >
                        {
                            openSearch && (
                                <span class={['p-drop-search', scrollTop > 12 && 'p-drop-search-shadow']}>
                                    <input class="p-drop-input"
                                        type="text"
                                        placeholder={placeholder}
                                        value={inputVal}
                                        onInput={inputValue}
                                        onMouseDown={inputDown}
                                    />
                                    <i v-show={inputVal} class="p-drop-clear" onClick={clearInput}><ClearSvg/></i>
                                </span>
                            )
                        }
                        <div class="p-drop-option" ref="dropOption" onScroll={scrollTopHandle}>
                            {
                                optionData.map((item, ind) => (
                                    <section key={`${ind}-${item.id}`}
                                        class={
                                            ['p-drop-option-item', modelValue === item.id && 'p-drop-option-selected', item.disabled && 'p-drop-option-disable']
                                        }
                                        onClick={(e) => optionClick(e, item.id, item.name, item.disabled)}
                                        onMouseenter={TextEllipsis}
                                    >
                                        {item.icon && <i class="p-drop-option-svg"/>}
                                        <span>{createStaticVNode(item.name)}</span>
                                    </section>
                                ))
                            }
                        </div>
                    </div>
                </Transition>
            );
        };
    }
});

export default DOption;
