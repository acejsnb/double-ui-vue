import './style.styl';
import {
    PropType,
    defineComponent,
    ref,
    reactive,
    computed,
    watch,
    onMounted,
    nextTick,
    getCurrentInstance
} from 'vue';

import { textEllipsis } from 'js-func-tools';
import TriangleIcon from '@/assets/iconSvg/triangle.svg';
import DeleteIcon from '@/assets/iconSvg/delete_icon.svg';
import CloseIcon from '@/assets/iconSvg/icon_close.svg';
import GetScrollbarWidth from '@/utils/GetScrollbarWidth';
import PopoverTip from '@/components/popoverTip/PopoverTip';
import GetCaptionWidth from './GetCaptionWidth';
import GetPopoverContent, { Item } from './GetPopoverContent';

interface IState {
	inputText: string;
	popoverTipContent: string;
	readonlyActive: boolean;
	inputShow: boolean;
	inputStatus: any;
	captionWidth: number;
	scrollbarWidth: number;
	errorTop: number;
}

const DropTrigger = defineComponent({
    name: 'DropTrigger',
    props: {
        // 触发器宽度
        width: {
            type: [String, Number],
            default: ''
        },
        // 触发器类型
        type: {
            type: String,
            default: 'normal' // normal tag
        },
        // 占位内容
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 触发器标题
        caption: {
            type: String,
            default: ''
        },
        // 禁用状态
        disabled: {
            type: Boolean,
            default: false
        },
        // 可显示清除按钮
        clearHide: {
            type: Boolean,
            default: false
        },
        // 开启搜索 - 默认可搜索
        openSearch: {
            type: Boolean,
            default: true
        },
        // 下拉列表可搜索
        dropSearch: {
            type: Boolean,
            default: false
        },
        // 单选还是多选
        multiple: {
            type: Boolean,
            default: false
        },
        selectedData: {
            type: (Object as PropType<Item>) || (Array as PropType<Item[]>)
            // type: [Object as PropType<Item>, Array as PropType<Item[]>]
            // default: []
        },
        // 下拉列表展开
        dropShow: {
            type: Boolean,
            default: false
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
        onClick: {
            type: Function,
            default: () => {}
        },
        onGetInputText: {
            type: Function,
            default: () => {}
        },
        delHandle: {
            type: Function,
            default: () => {}
        }
    },
    setup(props, { emit }) {
        const state = reactive<IState>({
            // 输入的内容
            inputText: '',
            // 输入框只读状态
            readonlyActive: true,
            // 输入框显示
            inputShow: false,
            // 是否正在输入
            inputStatus: null,
            // 标题宽度
            captionWidth: 0,
            // 滚动条宽度
            scrollbarWidth: 6,
            errorTop: 0,
            // popoverTip内容
            popoverTipContent: ''
        });
        state.popoverTipContent = GetPopoverContent(props.selectedData);

        const tag = ref(null);
        const countTag = ref(null);
        const popoverTip = ref(null);

        const { proxy }: any = getCurrentInstance();

        // 标题是否带有冒号
        const hasColon = computed(() => {
            const { caption } = props;
            return caption.includes(':') || caption.includes('：');
        });
        // 已选择
        const hasSelected = computed(() => {
            const { multiple, selectedData = {} } = props;
            const len = JSON.stringify(selectedData).length;
            if (multiple) return len > 4;
            return len > 2;
        });
        // tag标签的最大宽度
        const tabMaxWidth = computed(() => {
            const { width = 120 } = props;
            const { scrollbarWidth = 6 } = state;
            // 64 = 8 + 30 + 22 + 4
            const w = Number(width);
            return w - scrollbarWidth - 64;
        });

        let timerInputText: number = null;
        // 提交输入的值
        watch(
            () => state.inputText,
            (n, o) => {
                if (n === o) return;
                if (timerInputText) clearTimeout(timerInputText);
                timerInputText = window.setTimeout(() => {
                    emit('getInputText', n);
                }, 500);
            }
        );
        // 监听标题改变
        watch(
            () => props.caption,
            (n, o) => {
                if (n === o) return;
                if (props.type === 'tag') return;
                if (n) state.captionWidth = GetCaptionWidth(n);
            }
        );

        watch(
            () => props.dropShow,
            (n, o) => {
                if (n === o) return;
                if (props.type === 'tag') return;
                setTimeout(() => {
                    state.inputShow = n;
                    if (n) {
                        if (!props.multiple || !popoverTip.value) return;
                        // 关闭popoverTip
                        popoverTip.value.$options.changeTipShow(false);
                    } else {
                        state.inputStatus = null;
                        state.inputText = '';
                    }
                }, 300);
            }
        );
        watch(
            () => props.selectedData,
            (n, o) => {
                const nd = JSON.stringify(n);
                const od = JSON.stringify(o);
                if (nd === od) return;
                state.popoverTipContent = GetPopoverContent(n);
                const { type } = props;
                nextTick(() => {
                    if (type === 'tag') state.errorTop = proxy.$el.clientHeight + 6;
                });
            },
            { deep: true }
        );

        onMounted(() => {
            const { caption, type } = props;
            // 获取标题宽度
            if (caption) state.captionWidth = GetCaptionWidth(caption);
            // 滚动条宽度
            if (type === 'tag') state.scrollbarWidth = GetScrollbarWidth();
        });

        // 输入监听
        const inputHandle = (e: Event) => {
            const { data } = e as InputEvent;
            const { value } = e.target as HTMLInputElement;
            state.inputStatus = data || value;
            state.inputText = value;
        };
        // 点击触发器
        const dropOpenClick = (flag?: string) => {
            emit('click', flag);
        };
        // 点击三角形
        const triangleHandle = () => {
            dropOpenClick('triangle');
        };
        // 清除按钮回调
        const delHandle = () => {
            state.inputStatus = null;
            props.delHandle();
            // state.popoverTipContent = '';
        };
        // 输入框获取了焦点
        const focusHandle = () => {
            state.readonlyActive = false;
        };
        const blurHandle = () => {
            state.readonlyActive = true;
        };

        // type = tag 点击X按钮回调
        const tagCloseHandle = (item: Item) => {
            if (item.disabled) return;
            emit('clearItem', item);
        };

        return () => {
            const {
                disabled,
                errorShow,
                type,
                width,
                caption,
                openSearch,
                dropSearch,
                placeholder,
                multiple,
                selectedData,
                dropShow,
                clearHide,
                errorText
            } = props;
            const {
                captionWidth,
                inputStatus,
                inputShow,
                readonlyActive,
                inputText,
                errorTop,
                popoverTipContent
            } = state;

            return (
                <div
                    class={[
                        'd-drop-trigger',
                        `d-drop-trigger-${type}`,
                        disabled ? 'd-drop-trigger-disabled' : 'd-drop-trigger-active',
                        errorShow && 'p-trigger-error'
                    ]}
                    style={{ width: `${width}px` }}
                >
                    <div
                        class={['d-drop-trigger-main', `d-drop-trigger-main-${type}`]}
                        onClick={() => {
                            dropOpenClick();
                        }}
                    >
                        {caption && (
                            <div
                                class="d-drop-trigger-caption d-drop-trigger-text-overflow"
                                style={{ width: `${captionWidth}px` }}
                            >
                                {caption}
                            </div>
                        )}
                        {type === 'normal'
                            ? (
                                <section
                                    class={{
                                        'd-drop-trigger-label': true,
                                        'd-drop-trigger-label-pl': caption && !hasColon.value
                                    }}
                                    style={{ width: `calc(100% - ${captionWidth}px)` }}
                                >
                                    {!inputStatus && (
                                        <>
                                            {hasSelected.value
                                                ? (
                                                    <span
                                                        class={{
                                                            'd-drop-trigger-selected': true,
                                                            'd-drop-trigger-selected-focus': !readonlyActive
                                                        }}
                                                    >
                                                        {multiple
                                                            ? (
                                                                <PopoverTip
                                                                    ref={popoverTip}
                                                                    tag={tag}
                                                                    countTag={countTag}
                                                                    content={popoverTipContent}
                                                                    dropShow={dropShow}
                                                                >
                                                                    <span
                                                                        class="d-drop-trigger-selected-m"
                                                                        ref={tag}
                                                                    >
															已选择
                                                                        <span
                                                                            class="d-drop-trigger-selected-m-c"
                                                                            ref={countTag}
                                                                        >
                                                                            {(selectedData as Item[]).length}
                                                                        </span>
															项
                                                                    </span>
                                                                </PopoverTip>
                                                            )
                                                            : (
                                                                <span
                                                                    class="d-drop-trigger-selected-s"
                                                                    onMouseenter={textEllipsis}
                                                                >
                                                                    {(selectedData as Item).name}
                                                                </span>
                                                            )}
                                                    </span>
                                                )
                                                : (
                                                    <span class="d-drop-trigger-placeholder d-drop-trigger-text-overflow">
                                                        {placeholder}
                                                    </span>
                                                )}
                                        </>
                                    )}
                                    {openSearch && !disabled && !dropSearch && inputShow && (
                                        <input
                                            type="text"
                                            class={{
                                                'd-drop-trigger-input': true,
                                                'd-drop-trigger-text-overflow': true,
                                                'd-drop-trigger-input-readonly':
												readonlyActive && !dropShow,
                                                'd-drop-trigger-label-pl': caption && !hasColon.value
                                            }}
                                            value={inputText}
                                            onInput={inputHandle}
                                            onFocus={focusHandle}
                                            onBlur={blurHandle}
                                        />
                                    )}
                                </section>
                            )
                            : (
                                <>
                                    {selectedData && JSON.stringify(selectedData).length > 4
                                        ? (
                                            <div
                                                class="d-drop-trigger-main-tag-box"
                                                style={{ width: `calc(100% - ${captionWidth}px)` }}
                                            >
                                                <section class="d-drop-trigger-tag-list">
                                                    {(selectedData as Item[]).map((sd: Item) => (
                                                        <article
                                                            class="d-drop-trigger-tag-list-item"
                                                            key={sd.id}
                                                        >
                                                            <span
                                                                class="d-drop-trigger-tag-list-text d-drop-trigger-text-overflow"
                                                                style={{
                                                                    maxWidth: `${tabMaxWidth.value}px`
                                                                }}
                                                                onMouseenter={textEllipsis}
                                                            >
                                                                {sd.name}
                                                            </span>
                                                            <i
                                                                class={[
                                                                    'd-drop-trigger-tag-list-svg',
                                                                    sd.disabled
                                                                        ? 'd-drop-trigger-tag-list-svg-disabled'
                                                                        : 'd-drop-trigger-tag-list-svg-normal'
                                                                ]}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    tagCloseHandle(sd);
                                                                }}
                                                            >
                                                                <CloseIcon />
                                                            </i>
                                                        </article>
                                                    ))}
                                                </section>
                                            </div>
                                        )
                                        : (
                                            <section
                                                class="d-drop-trigger-label"
                                                style={{ width: `calc(100% - ${captionWidth}px)` }}
                                            >
                                                <span class="d-drop-trigger-placeholder d-drop-trigger-text-overflow">
                                                    {placeholder}
                                                </span>
                                            </section>
                                        )}
                                </>
                            )}
                    </div>
                    <div
                        class={{
                            'd-drop-trigger-icon': true,
                            'd-drop-trigger-icon-clear':
								!clearHide && hasSelected.value && !disabled
                        }}
                    >
                        <i
                            class={{
                                'd-drop-trigger-svg': true,
                                'd-drop-trigger-tgl': true,
                                'd-drop-trigger-tgl-open': !dropShow
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                triangleHandle();
                            }}
                        >
                            <TriangleIcon />
                        </i>
                        <i
                            class="d-drop-trigger-svg d-drop-trigger-del"
                            onClick={(e: MouseEvent) => {
                                e.stopPropagation();
                                delHandle();
                            }}
                        >
                            <DeleteIcon />
                        </i>
                    </div>
                    {errorShow && (
                        <span class="p-trigger-error-text" style={{ top: `${errorTop}px` }}>
                            {errorText}
                        </span>
                    )}
                </div>
            );
        };
    }
});

export default DropTrigger;
