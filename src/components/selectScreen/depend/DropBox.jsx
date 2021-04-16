import './style.styl';
import {
    defineComponent, reactive, watch, nextTick, getCurrentInstance, onBeforeUnmount, Transition
} from 'vue';

import ClearSvg from '../../static/iconSvg/clear2.svg';
import TextEllipsis from '../../static/utils/TextEllipsis';

import Checkbox from '../../checkbox/Checkbox';

const DropBox = defineComponent({
    name: 'DropBox',
    props: {
        // 筛选4种状态 【'single', 'multiple', 'singleSearch', 'multipleSearch'】
        status: {
            type: String,
            default: 'single'
        },
        data: {
            type: Array,
            default: () => []
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

        const { ctx } = getCurrentInstance();

        // 设置下拉列表数据 kw——keyWords
        const setDropData = (data, kw = '') => {
            const { status } = props;
            const strategy = {
                filter() {
                    if (kw) {
                        return data.filter(d => {
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
                    state.dropData = data.map(d => {
                        d.checked = d.checked || 'uncheck';
                        d.disabled = d.disabled || false;
                        return d;
                    });
                },
                singleSearch() {
                    state.dropData = this.filter();
                },
                multipleSearch() {
                    state.dropData = this.filter().map(d => {
                        d.checked = d.checked || 'uncheck';
                        d.disabled = d.disabled || false;
                        return d;
                    });
                }
            };
            strategy[status]();
            state.dropDataHistory = JSON.parse(JSON.stringify(state.dropData));
        };

        watch(() => props.data, (n) => {
            setDropData(JSON.parse(JSON.stringify(n)));
        }, { deep: true, immediate: true });

        let timer = null;
        watch(() => state.searchText, (n, o) => {
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
        });

        watch(() => state.dropBoxStatus, (n) => {
            if (n) {
                nextTick(() => {
                    ctx.$el.focus();
                });
            }
        });

        // 输入文字
        const searchTextInput = (e) => {
            state.searchText = e.target.value;
        };

        // 清楚输入的文字
        const clearText = () => {
            const { status } = props,
                { dropDataHistory, dropData } = state;
            state.searchText = '';
            state.dropData = [];
            if (status.includes('Search')) {
                if (status.includes('single')) {
                    props.change('', {});
                } else {
                    state.activeConfirm = JSON.stringify(dropDataHistory) !== JSON.stringify(dropData);
                }
            }
        };

        // 选中项 - 单选
        const itemClick = (item) => {
            props.change(item.id, item);
            state.dropBoxStatus = false;
        };
        // checkbox状态改变
        const checkboxChange = (v, i) => {
            const { dropData } = state;
            const dData = dropData.map((d, ind) => {
                if (Number(i) === ind) d.checked = v;
                return d;
            });
            state.dropData = dData;
            state.activeConfirm = JSON.stringify(state.dropDataHistory) !== JSON.stringify(dData);
        };
        const cancel = () => {
            const { status } = props,
                { confirmClicked, dropDataHistory } = state;
            if (status.includes('multiple')) state.dropData = JSON.parse(JSON.stringify(dropDataHistory));
            state.activeConfirm = false;
            if (status.includes('Search') && !confirmClicked) setTimeout(() => { clearText(); }, 300);
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
            ctx.$el.focus();
        };
        const confirm = () => {
            if (!state.activeConfirm) return;
            const { dropData } = state,
                selectedData = [],
                selectedId = [];
            dropData.forEach(d => {
                if (d.checked === 'checked') {
                    selectedData.push(d);
                    selectedId.push(d.id);
                }
            });
            setTimeout(() => { state.dropDataHistory = JSON.parse(JSON.stringify(state.dropData)); }, 300);
            props.change(selectedId.toString(), selectedData);
            state.activeConfirm = false;
            state.confirmClicked = true;
        };

        onBeforeUnmount(() => {
            if (timer) clearTimeout(timer);
        });

        return () => {
            const { status, placeholder, selectedId } = props,
                {
                    position, dropBoxStatus, searchText, dropData, activeConfirm
                } = state;
            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div v-show={dropBoxStatus}
                        class={[
                            'p-drop-box',
                            status.includes('multiple')
                                ? `p-drop-box-multiple${status.includes('Search') ? '-search' : ''}`
                                : `p-drop-box-single${status.includes('Search') ? '-search' : ''}`
                        ]}
                        tabindex="-1"
                        onBlur={blurHandle}
                        onMouseenter={dropBoxEnter}
                        onMouseleave={dropBoxLeave}
                    >
                        {status.includes('Search') && <div class="p-drop-box-search">
                            <input type="text" class="p-drop-box-input" value={searchText} placeholder={placeholder} onInput={searchTextInput}/>
                            <i v-show={!!searchText} class="p-drop-box-input-clear" onClick={clearText}><ClearSvg /></i>
                        </div>}
                        <div class="p-drop-box-list">
                            {
                                dropData.map((item, i) => (
                                    <div class={[
                                        'p-drop-box-item',
                                        status.includes('multiple') && 'p-drop-box-item-checkbox',
                                        (status.includes('single') && selectedId === item.id) && 'p-drop-box-item-selected'
                                    ]}
                                    key={`item-${item.id}-${i}`}
                                    >
                                        {
                                            status.includes('multiple')
                                                ? <Checkbox
                                                    checked={item.checked}
                                                    disabled={item.disabled}
                                                    attr={i}
                                                    onChange={checkboxChange}
                                                >{item.name}</Checkbox>
                                                : <section class="p-drop-box-text"
                                                    onMouseenter={TextEllipsis}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        itemClick(item);
                                                    }}
                                                >{item.name}</section>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        {status.includes('multiple') && <div class={['p-drop-box-handle', (dropData.length > 5) && 'p-drop-box-handle-shadow']}>
                            <section class="p-drop-box-btn p-drop-box-cancel" onClick={cancel}>取消</section>
                            <section class={['p-drop-box-btn', activeConfirm ? 'p-drop-box-confirm' : 'p-drop-box-disabled']}
                                onClick={confirm}
                            >确定</section>
                        </div>}
                    </div>
                </Transition>
            );
        };
    }
});

export default DropBox;
