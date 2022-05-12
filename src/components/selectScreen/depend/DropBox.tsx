import './style.styl';
import {
    PropType,
    defineComponent,
    reactive,
    watch,
    nextTick,
    getCurrentInstance,
    onBeforeUnmount,
    Transition
} from 'vue';
import { textEllipsis } from 'js-func-tools';
import ClearSvg from '@/assets/iconSvg/clear2.svg';

import Checkbox from '../../checkbox/Checkbox';

export interface Item {
	id: string;
	name: string;
	[key: string]: any;
}

const DropBox = defineComponent({
    name: 'DropBox',
    props: {
        // 筛选4种状态 【'single', 'multiple', 'singleSearch', 'multipleSearch'】
        status: {
            type: String,
            default: 'single'
        },
        data: {
            type: Array as PropType<Item[]>,
            default: (): Item[] => []
        },
        selectedId: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        // screen triangle
        icon: {
            type: String,
            default: 'screen'
        },
        change: {
            type: Function,
            default: () => {}
        },
        cancel: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const state = reactive({
            position: true, // 动画执行方向
            dropBoxStatus: false, // 下拉面板状态
            activeClose: true, // 是否可关闭弹窗
            activeConfirm: false, // 是否可点击确定
            searchText: '', // 搜索输入的文字
            dropDataHistory: [], // 下拉面板数据
            dropData: [], // 下拉面板数据
            confirmClicked: false // 点击过确定
        });
        DropBox.state = state;

        const { proxy }: any = getCurrentInstance();

        // 设置下拉列表数据 kw——keyWords
        const setDropData = (data: Item[], kw = '') => {
            const { status } = props;
            const strategy = {
                filter() {
                    if (kw) {
                        return data.filter((d) => {
                            if (d.name.includes(kw)) return d;
                            return null;
                        });
                    }
                    return [];
                },
                single() {
                    state.dropData = data;
                },
                multiple() {
                    state.dropData = data.map((d) => {
                        d.checked = d.checked || 'uncheck';
                        d.disabled = d.disabled || false;
                        return d;
                    });
                },
                singleSearch() {
                    state.dropData = this.filter();
                },
                multipleSearch() {
                    state.dropData = this.filter().map((d) => {
                        d.checked = d.checked || 'uncheck';
                        d.disabled = d.disabled || false;
                        return d;
                    });
                }
            };
            strategy[status]();
            state.dropDataHistory = JSON.parse(JSON.stringify(state.dropData));
        };

        watch(
            () => props.data,
            (n) => {
                setDropData(JSON.parse(JSON.stringify(n)));
            },
            { deep: true, immediate: true }
        );

        let timer: number = null;
        watch(
            () => state.searchText,
            (n, o) => {
                if (n === o) return;
                if (n) {
                    if (timer) clearTimeout(timer);
                    const { data } = props;
                    timer = setTimeout(() => {
                        setDropData(JSON.parse(JSON.stringify(data)), n);
                    }, 300);
                } else {
                    state.dropData = [];
                }
            }
        );

        watch(
            () => state.dropBoxStatus,
            (n) => {
                if (n) {
                    nextTick(() => {
                        proxy.$el.focus();
                    });
                }
            }
        );

        // 输入文字
        const searchTextInput = (e: Event) => {
            state.searchText = (e.target as HTMLInputElement).value;
        };

        // 清楚输入的文字
        const clearText = () => {
            const { status } = props;
            const { dropDataHistory, dropData } = state;
            state.searchText = '';
            state.dropData = [];
            if (status.includes('Search')) {
                if (status.includes('single')) {
                    props.change('', {});
                } else {
                    state.activeConfirm =
						JSON.stringify(dropDataHistory) !== JSON.stringify(dropData);
                }
            }
        };

        // 选中项 - 单选
        const itemClick = (item: Item) => {
            props.change(item.id, item);
            state.dropBoxStatus = false;
        };
        // checkbox状态改变
        const checkboxChange = (v: string, i: string | number) => {
            const { dropData } = state;
            const dData = dropData.map((d, ind) => {
                if (Number(i) === ind) d.checked = v;
                return d;
            });
            state.dropData = dData;
            state.activeConfirm = JSON.stringify(state.dropDataHistory) !== JSON.stringify(dData);
        };
        const cancel = () => {
            const { status } = props;
            const { confirmClicked, dropDataHistory } = state;
            if (status.includes('multiple')) { state.dropData = JSON.parse(JSON.stringify(dropDataHistory)); }
            state.activeConfirm = false;
            if (status.includes('Search') && !confirmClicked) {
                setTimeout(() => {
                    clearText();
                }, 300);
            }
            props.cancel(false);
        };
        const blurHandle = () => {
            if (!state.activeClose) return;
            cancel();
        };
        const dropBoxEnter = () => {
            state.activeClose = false;
        };
        const dropBoxLeave = () => {
            state.activeClose = true;
            proxy.$el.focus();
        };
        const confirm = () => {
            if (!state.activeConfirm) return;
            const { dropData } = state;
            const selectedData: Item[] = [];
            const selectedId: string[] = [];
            dropData.forEach((d) => {
                if (d.checked === 'checked') {
                    selectedData.push(d);
                    selectedId.push(d.id);
                }
            });
            setTimeout(() => {
                state.dropDataHistory = JSON.parse(JSON.stringify(state.dropData));
            }, 300);
            props.change(selectedId.toString(), selectedData);
            state.activeConfirm = false;
            state.confirmClicked = true;
        };

        onBeforeUnmount(() => {
            if (timer) clearTimeout(timer);
        });

        return () => {
            const { status, placeholder, selectedId } = props;
            const { position, dropBoxStatus, searchText, dropData, activeConfirm } = state;
            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div
                        v-show={dropBoxStatus}
                        class={[
                            'd-drop-box',
                            status.includes('multiple')
                                ? `d-drop-box-multiple${status.includes('Search') ? '-search' : ''}`
                                : `d-drop-box-single${status.includes('Search') ? '-search' : ''}`
                        ]}
                        tabindex="-1"
                        onBlur={blurHandle}
                        onMouseenter={dropBoxEnter}
                        onMouseleave={dropBoxLeave}
                    >
                        {status.includes('Search') && (
                            <div class="d-drop-box-search">
                                <input
                                    type="text"
                                    class="d-drop-box-input"
                                    value={searchText}
                                    placeholder={placeholder}
                                    onInput={searchTextInput}
                                />
                                <i
                                    v-show={!!searchText}
                                    class="d-drop-box-input-clear"
                                    onClick={clearText}
                                >
                                    <ClearSvg />
                                </i>
                            </div>
                        )}
                        <div class="d-drop-box-list">
                            {dropData.map((item, i) => (
                                <div
                                    class={[
                                        'd-drop-box-item',
                                        status.includes('multiple') && 'd-drop-box-item-checkbox',
                                        status.includes('single') &&
											selectedId === item.id &&
											'd-drop-box-ited-selected'
                                    ]}
                                    key={`item-${item.id}-${i}`}
                                >
                                    {status.includes('multiple')
                                        ? (
                                            <Checkbox
                                                checked={item.checked}
                                                disabled={item.disabled}
                                                attr={`${i}`}
                                                onChange={checkboxChange}
                                            >
                                                {item.name}
                                            </Checkbox>
                                        )
                                        : (
                                            <section
                                                class="d-drop-box-text"
                                                onMouseenter={textEllipsis}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    itemClick(item);
                                                }}
                                            >
                                                {item.name}
                                            </section>
                                        )}
                                </div>
                            ))}
                        </div>
                        {status.includes('multiple') && (
                            <div
                                class={[
                                    'd-drop-box-handle',
                                    dropData.length > 5 && 'd-drop-box-handle-shadow'
                                ]}
                            >
                                <section class="d-drop-box-btn d-drop-box-cancel" onClick={cancel}>
									取消
                                </section>
                                <section
                                    class={[
                                        'd-drop-box-btn',
                                        activeConfirm ? 'd-drop-box-confirm' : 'd-drop-box-disabled'
                                    ]}
                                    onClick={confirm}
                                >
									确定
                                </section>
                            </div>
                        )}
                    </div>
                </Transition>
            );
        };
    }
});

export default DropBox;
