import './style.styl';
import {
    defineComponent, ref, reactive, computed, watch, onMounted, nextTick, getCurrentInstance
} from 'vue';

import TriangleIcon from '../static/iconSvg/triangle.svg';
import DeleteIcon from '../static/iconSvg/delete_icon.svg';
import CloseIcon from '../static/iconSvg/icon_close.svg';
import TextEllipsis from '../static/utils/TextEllipsis';
import GetCaptionWidth from './GetCaptionWidth';
import GetPopoverContent from './GetPopoverContent';
import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';
import PopoverTip from '../popoverTip/PopoverTip';

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
            type: [Array, Object],
            default: () => ({})
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
        }
    },
    setup(props, { emit }) {
        const state = reactive({
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

        const tag = ref(null),
            countTag = ref(null),
            popoverTip = ref(null);

        const { ctx } = getCurrentInstance();

        // 标题是否带有冒号
        const hasColon = computed(() => {
            const { caption } = props;
            return (caption.includes(':') || caption.includes('：'));
        });
        // 已选择
        const hasSelected = computed(() => {
            const { multiple, selectedData } = props,
                len = JSON.stringify(selectedData).length;
            if (multiple) return len > 4;
            return len > 2;
        });
        // tag标签的最大宽度
        const tabMaxWidth = computed(() => {
            const { width = 120 } = props,
                { scrollbarWidth = 6 } = state;
            // 64 = 8 + 30 + 22 + 4
            return width - scrollbarWidth - 64;
        });

        let timerInputText = null;
        // 提交输入的值
        watch(() => state.inputText, (n, o) => {
            if (n === o) return;
            if (timerInputText) clearTimeout(timerInputText);
            timerInputText = setTimeout(() => {
                emit('getInputText', n);
            }, 500);
        });
        // 监听标题改变
        watch(() => props.caption, (n, o) => {
            if (n === o) return;
            if (props.type === 'tag') return;
            if (n) state.captionWidth = GetCaptionWidth(n);
        });

        watch(() => props.dropShow, (n, o) => {
            if (n === o) return;
            if (props.type === 'tag') return;
            setTimeout(() => {
                state.inputShow = n;
                if (!n) {
                    state.inputStatus = null;
                    state.inputText = '';
                }
                // 关闭popoverTip
                if (n && popoverTip?.value.$options?.tipModal?.type.state.show) {
                    popoverTip.value.$options.tipModal.type.state.show = false;
                }
            }, 300);
        });
        watch(() => props.selectedData, (n, o) => {
            const nd = JSON.stringify(n),
                od = JSON.stringify(o);
            if (nd === od) return;
            state.popoverTipContent = GetPopoverContent(n);
            const { type } = props;
            nextTick(() => {
                if (type === 'tag') state.errorTop = ctx.$el.clientHeight + 6;
            });
        }, { deep: true });

        onMounted(() => {
            const { caption, type } = props;
            // 获取标题宽度
            if (caption) state.captionWidth = GetCaptionWidth(caption);
            // 滚动条宽度
            if (type === 'tag') state.scrollbarWidth = GetScrollbarWidth();
        });

        // 输入监听
        const inputHandle = (e) => {
            const { data, target: { value } } = e;
            state.inputStatus = data || value;
            state.inputText = value;
        };
        // 点击触发器
        const dropOpenClick = (flag) => {
            emit('click', flag);
        };
        // 点击三角形
        const triangleHandle = () => {
            dropOpenClick('triangle');
        };
        // 清除按钮回调
        const delHandle = () => {
            state.inputStatus = null;
            emit('delHandle');
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
        const tagCloseHandle = (item) => {
            if (item.disabled) return;
            emit('clearItem', item);
        };

        return () => {
            const {
                    disabled, errorShow, type, width, caption, openSearch, dropSearch, placeholder, multiple, selectedData,
                    dropShow, clearHide, errorText
                } = props,
                {
                    captionWidth, inputStatus, inputShow, readonlyActive, inputText, errorTop, popoverTipContent
                } = state;

            return (
                <PopoverTip
                    ref={popoverTip}
                    tag={tag}
                    countTag={countTag}
                    content={popoverTipContent}
                    dropShow={dropShow}
                >
                    <div class={[
                        'p-drop-trigger',
                        `p-drop-trigger-${type}`,
                        disabled ? 'p-drop-trigger-disabled' : 'p-drop-trigger-active',
                        errorShow && 'p-trigger-error'
                    ]}
                    style={{ width: `${width}px` }}
                    >
                        <div class={['p-drop-trigger-main', `p-drop-trigger-main-${type}`]} onClick={dropOpenClick}>
                            {caption && <div class="p-drop-trigger-caption p-drop-trigger-text-overflow" style={{ width: `${captionWidth}px` }}>
                                {caption}
                            </div>}
                            {
                                type === 'normal'
                                    ? (<section class={{
                                        'p-drop-trigger-label': true,
                                        'p-drop-trigger-label-pl': caption && !hasColon
                                    }}
                                    style={{ width: `calc(100% - ${captionWidth}px)` }}
                                    >
                                        {
                                            !inputStatus && (<>
                                                {
                                                    hasSelected.value
                                                        ? <span class={{
                                                            'p-drop-trigger-selected': true,
                                                            'p-drop-trigger-selected-focus': !readonlyActive
                                                        }}>
                                                            {
                                                                multiple
                                                                    ? <span class="p-drop-trigger-selected-m"
                                                                        ref={tag}
                                                                    >已选择<span class="p-drop-trigger-selected-m-c"
                                                                            ref={countTag}>{selectedData.length}</span>项</span>
                                                                    : <span class="p-drop-trigger-selected-s"
                                                                        onMouseenter={TextEllipsis}>{selectedData.name}</span>
                                                            }
                                                        </span>
                                                        : <span class="p-drop-trigger-placeholder p-drop-trigger-text-overflow">{placeholder}</span>
                                                }
                                            </>)
                                        }
                                        {
                                            (openSearch && !disabled && !dropSearch && inputShow)
                                            && <input type="text"
                                                class={{
                                                    'p-drop-trigger-input': true,
                                                    'p-drop-trigger-text-overflow': true,
                                                    'p-drop-trigger-input-readonly': readonlyActive && !dropShow,
                                                    'p-drop-trigger-label-pl': caption && !hasColon.value
                                                }}
                                                value={inputText}
                                                onInput={inputHandle}
                                                onFocus={focusHandle}
                                                onBlur={blurHandle}
                                            />
                                        }
                                    </section>)
                                    : (<>
                                        {
                                            (selectedData && JSON.stringify(selectedData).length > 4)
                                                ? <div class="p-drop-trigger-main-tag-box" style={{ width: `calc(100% - ${captionWidth}px)` }}>
                                                    <section class="p-drop-trigger-tag-list">
                                                        {
                                                            selectedData.map((sd, sdi) => (
                                                                <article class="p-drop-trigger-tag-list-item" key={`${sd.id}-${sdi}`}>
                                                                    <span class="p-drop-trigger-tag-list-text p-drop-trigger-text-overflow"
                                                                        style={{ maxWidth: `${tabMaxWidth.value}px` }}
                                                                        onMouseenter={TextEllipsis}
                                                                    >{sd.name}</span>
                                                                    <i class={[
                                                                        'p-drop-trigger-tag-list-svg',
                                                                        sd.disabled
                                                                            ? 'p-drop-trigger-tag-list-svg-disabled'
                                                                            : 'p-drop-trigger-tag-list-svg-normal'
                                                                    ]}
                                                                    onClick={e => {
                                                                        e.stopPropagation();
                                                                        tagCloseHandle(sd);
                                                                    }}
                                                                    ><CloseIcon/></i>
                                                                </article>
                                                            ))
                                                        }
                                                    </section>
                                                </div>
                                                : <section class="p-drop-trigger-label" style={{ width: `calc(100% - ${captionWidth}px)` }}>
                                                    <span class="p-drop-trigger-placeholder p-drop-trigger-text-overflow">{placeholder}</span>
                                                </section>
                                        }
                                    </>)
                            }
                        </div>
                        <div class={{
                            'p-drop-trigger-icon': true,
                            'p-drop-trigger-icon-clear': !clearHide && hasSelected && !disabled
                        }}>
                            <i class={{
                                'p-drop-trigger-svg': true,
                                'p-drop-trigger-tgl': true,
                                'p-drop-trigger-tgl-open': !dropShow
                            }}
                            onClick={e => {
                                e.stopPropagation();
                                triangleHandle();
                            }}
                            ><TriangleIcon /></i>
                            <i class="p-drop-trigger-svg p-drop-trigger-del">
                                <DeleteIcon
                                    onClick={e => {
                                        e.stopPropagation();
                                        delHandle();
                                    }}
                                />
                            </i>
                        </div>
                        {errorShow && <span class="p-trigger-error-text" style={{ top: `${errorTop}px` }}>{errorText}</span>}
                    </div>
                </PopoverTip>
            );
        };
    }
});

export default DropTrigger;
