import {
    PropType,
    defineComponent,
    Transition,
    watch,
    getCurrentInstance,
    reactive,
    createStaticVNode,
    onMounted,
    onBeforeUnmount
} from 'vue';
import ClickOutside from '@/utils/ClickOutside';
import FindTarget from '@/utils/FindTarget';
import ClearSvg from '@/assets/iconSvg/clear2.svg';
import TextEllipsis from '@/utils/TextEllipsis';

export interface Item {
	id: string;
	name: string;
	disabled?: boolean | unknown;
	icon?: boolean;
}
interface OItem extends Item {
	value: string | number;
}

// 列表item
const OptionItem = (props: OItem) => (
    <section
        key={props.id}
        class={[
            'd-drop-option-item',
            props.value === props.id && 'd-drop-option-selected',
            props.disabled && 'd-drop-option-disable'
        ]}
        data-id={props.id}
    >
        {props.icon && <i class="d-drop-option-svg" />}
        <span>{createStaticVNode(props.name, 0)}</span>
    </section>
);
const DOption = defineComponent({
    name: 'DOption',
    props: {
        parentState: {
            type: Object,
            default: () => ({})
        },
        // 动画执行方向
        position: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array as PropType<Item[]>,
            default: (): Item[] => [],
            required: true
        },
        /**
		 * 绑定的值
		 */
        value: {
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
            inputVal: '', // 搜索输入的值
            optionData: [], // 列表数据
            scrollTop: 0 // 滚动条距离顶部距离
        });
        const { proxy }: any = getCurrentInstance();

        let timer: NodeJS.Timeout;

        watch(
            () => props.parentState.optionStatus,
            (n) => {
                if (n) {
                    setTimeout(() => {
                        proxy.$el.style.pointerEvents = 'auto';
                        proxy.$el.focus();
                    }, 300);
                } else {
                    proxy.$el.style.pointerEvents = 'none';
                }
            }
        );
        watch(
            () => props.data,
            (n, o) => {
                const nData = JSON.stringify(n);
                const oData = JSON.stringify(o);
                if (nData === oData) return;
                state.optionData = JSON.parse(nData);
            },
            { deep: true, immediate: true }
        );

        const inputHandle = (e: Event) => {
            state.inputVal = (e.target as HTMLInputElement).value;
        };
        // 搜索数据
        const searchHandle = (str: string) => {
            const data = JSON.parse(JSON.stringify(props.data));
            if (str) {
                state.optionData = data.filter((d: Item) => {
                    if (d.name.includes(str)) return d;
                    return null;
                });
            } else {
                state.optionData = data;
            }
        };
        watch(
            () => state.inputVal,
            (n, o) => {
                if (n === o) return;
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    searchHandle(n);
                }, 300);
            }
        );
        // 清除输入的内容
        const clearInput = () => {
            state.inputVal = '';
        };

        const dropClick = (e: MouseEvent) => {
            const {
                dataset: { id }
            } = FindTarget(e.target as HTMLElement, 'SECTION');
            const { optionData } = state;
            const { name = '', disabled = false } = optionData.find((d) => d.id === id);
            if (disabled) return;
            // 提交当前选择的值
            props.optionClick(id, name);
        };
        const dropClose = () => {
            const { parentState } = props;
            parentState.optionStatus = false;
        };
        const dropEnter = () => {
            if (props.parentState.dropTimer) clearTimeout(props.parentState.dropTimer);
        };
        const dropLeave = () => {
            const { trigger, parentState } = props;
            if (trigger === 'hover') parentState.dropTimer = setTimeout(dropClose, 300);
        };

        const scrollTopHandle = (e: UIEvent) => {
            state.scrollTop = (e.target as HTMLDivElement).scrollTop;
        };
        const clickOutSide = (e: MouseEvent) => {
            ClickOutside(e, proxy.$el, dropClose);
        };
        // 挂载完成之后监听点击
        onMounted(() => {
            window.addEventListener('click', clickOutSide, true);
            window.addEventListener('blur', dropClose, true);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('click', clickOutSide);
            window.removeEventListener('blur', dropClose);
        });

        return () => {
            const {
                parentState: { optionStatus },
                position,
                theme,
                arrow,
                minWidth,
                maxWidth,
                openSearch,
                placeholder,
                value
            } = props;
            const { scrollTop, inputVal, optionData } = state;
            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div
                        v-show={optionStatus}
                        class={[
                            'd-drop-content',
                            `d-drop-content-${theme}`,
                            arrow &&
								(position
								    ? 'd-drop-content-top-arrow'
								    : 'd-drop-content-bottom-arrow')
                        ]}
                        style={{
                            minWidth: `${minWidth}px`,
                            maxWidth: `${maxWidth}px`
                        }}
                        onWheel={(e: UIEvent) => {
                            e.stopPropagation();
                        }}
                        onMouseenter={dropEnter}
                        onMouseleave={dropLeave}
                    >
                        {openSearch && (
                            <span
                                class={['d-drop-search', scrollTop > 12 && 'd-drop-search-shadow']}
                            >
                                <input
                                    class="d-drop-input"
                                    type="text"
                                    placeholder={placeholder}
                                    value={inputVal}
                                    onInput={inputHandle}
                                />
                                <i v-show={inputVal} class="d-drop-clear" onClick={clearInput}>
                                    <ClearSvg />
                                </i>
                            </span>
                        )}
                        <div
                            class="d-drop-option"
                            ref="dropOption"
                            onScroll={scrollTopHandle}
                            onClick={dropClick}
                            onMouseover={(e: MouseEvent) => {
                                TextEllipsis(e, 'SECTION');
                            }}
                        >
                            {optionData.map((item: Item) => (
                                <OptionItem {...item} value={value} />
                            ))}
                        </div>
                    </div>
                </Transition>
            );
        };
    }
});

export default DOption;
