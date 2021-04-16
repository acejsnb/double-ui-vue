import './style.styl';

import {
    defineComponent, ref, reactive, watch, nextTick, Transition
} from 'vue';

import DragSortSvg from '../../static/iconSvg/drag_sort.svg';
import CloneDeep from '../../static/utils/CloneDeep';

import Checkbox from '../../checkbox/Checkbox';
import Button from '../../button/Button';
import Message from '../../message';

const HeaderSetting = defineComponent({
    name: 'HeaderSetting',
    props: {
        // 数据
        data: {
            type: Array,
            default: () => []
        },
        initData: {
            type: Array,
            default: () => []
        },
        // 显示状态
        parent: {
            type: Object,
            default: () => {}
        },
        // 设置可拖动排序
        draggable: {
            type: Boolean,
            default: false
        },
        // 弹出方向 - true向上弹窗
        position: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const headerSetting = ref(null);
        const settingContent = ref(null);
        const state = reactive({
            settingStatus: false, // 显示状态
            activeClose: false, // 显示状态
            historyData: [], // 保存的历史数据
            currentData: [], // 当前使用的数据
            dragging: null, // 被拖拽的对象
            msgInfo: null // 弹窗消息盒子
        });

        // checkbox状态改变
        const checkboxChange = (status, obj) => {
            const { currentData } = state,
                { index } = obj;
            const strategy = {
                checked() {
                    currentData[index].checked = status;
                },
                uncheck() {
                    const fData = currentData.filter(d => d.checked === 'checked');
                    if (fData && fData.length === 1) {
                        if (state.msgInfo && !state.msgInfo.isUnmounted) state.msgInfo.changeMessage('至少应选择一项');
                        else state.msgInfo = Message.info('至少应选择一项');
                        currentData[index].checked = 'checked';
                    } else {
                        currentData[index].checked = status;
                    }
                }
            };
            strategy[status]();
        };
        /* 拖拽 - s */
        const onDragStart = (e) => {
            const { target } = e;
            const { nodeName, dataset: { disabled } } = target;
            if (nodeName !== 'SECTION' || disabled === 'disabled') return;
            e.dataTransfer.dropEffect = 'move';
            target.className += ' p-header-setting-item-hover';
            state.dragging = target;
        };
        const getIndex = (el) => {
            const domData = Array.from(settingContent.value.childNodes);
            return domData.findIndex(d => d.innerText === el.innerText);
        };
        // 设置动画
        const setAnimate = (startPos, dom) => {
            const offset = startPos - dom.getBoundingClientRect().top;
            dom.style.transition = 'none';
            dom.style.transform = `translateY(${offset}px)`;
            // 触发重绘
            const ow = dom.offsetWidth;
            dom.style.transition = 'transform .3s';
            dom.style.transform = '';

            clearTimeout(dom.animated);

            dom.animated = setTimeout(() => {
                dom.style.transition = '';
                dom.style.transform = '';
                dom.animated = false;
            }, 300);
        };
        const onDragOver = (e) => {
            e.preventDefault();
            const { dragging } = state;
            if (!dragging) return;
            const { target } = e,
                { dataset: { disabled = '' }, nodeName } = target;
            if (disabled || nodeName !== 'SECTION' || target === dragging) return;
            // e.dataTransfer.dropEffect = 'move';
            const { top: targetTop } = target.getBoundingClientRect(),
                { top: draggingTop } = dragging.getBoundingClientRect();

            if (target && target.animated) return;

            if (getIndex(dragging) < getIndex(target)) target.parentNode.insertBefore(dragging, target.nextSibling);
            else target.parentNode.insertBefore(dragging, target);

            setAnimate(targetTop, target);
            setAnimate(draggingTop, dragging);
        };
        const onDragEnd = () => {
            const { dragging } = state;
            if (!dragging) return;
            const { currentData } = state,
                currentNodes = Array.from(settingContent.value.childNodes),
                arr = currentNodes.map(d => currentData.find(d2 => (d2.key === d.dataset.key)));
            dragging.className = dragging.className.replace(' p-header-setting-item-hover', '');
            state.dragging = null;
            state.currentData = arr;
        };
        /* 拖拽 - e */
        // 恢复默认
        const recoverDefault = () => {
            const { initData } = props;
            state.currentData = CloneDeep(initData);
            emit('settingReset', 'reset');
        };
        // 取消按钮
        const cancel = () => {
            emit('changeSettingStatus', false);
            state.settingStatus = false;
            setTimeout(() => {
                state.currentData = CloneDeep(state.historyData);
            }, 300);
            emit('settingCancel', 'cancel');
        };
        // 失去焦点事件
        const blurSetting = () => {
            setTimeout(() => {
                if (state.settingStatus && state.activeClose) cancel();
            });
        };
        const settingEnter = () => {
            state.activeClose = false;
        };
        const settingLeave = () => {
            state.activeClose = true;
        };
        // 确定按钮
        const confirm = () => {
            emit('changeSettingStatus', false);
            state.settingStatus = false;
            const { currentData } = state;
            state.historyData = CloneDeep(currentData);
            const checkedData = currentData.filter(d => d.checked === 'checked');
            emit('checkedHandle', checkedData, currentData, 'confirm');
        };

        watch(() => props.data, (n = [], o = []) => {
            const nData = JSON.parse(JSON.stringify(n)),
                oData = JSON.parse(JSON.stringify(o));
            if (nData === oData) return;
            state.historyData = CloneDeep(n);
            state.currentData = CloneDeep(n);
        }, { immediate: true, deep: true });
        watch(() => state.settingStatus, (n, o) => {
            if (n === o) return;
            if (n && headerSetting) {
                nextTick(() => {
                    headerSetting.value.focus();
                });
            }
        });

        return () => {
            const { position, draggable } = props,
                { settingStatus, currentData } = state;
            return (
                <Transition name={position ? 'selectDownUpExtendTop' : 'selectDownUpExtend'}>
                    <div v-show={settingStatus}
                        class="p-header-setting"
                        tabIndex="-1"
                        ref={headerSetting}
                        onBlur={blurSetting}
                        onMouseenter={settingEnter}
                        onMouseleave={settingLeave}
                    >
                        <div class="p-header-setting-content"
                            ref={settingContent}
                            onDragstart={onDragStart}
                            onDragover={onDragOver}
                            onFragend={onDragEnd}
                        >
                            {
                                currentData.map((h, hi) => (
                                    <section class={[
                                        'p-header-setting-item',
                                        draggable && 'p-header-setting-item-draggable',
                                        h.disabled ? 'p-header-setting-disabled' : 'p-header-setting-normal'
                                    ]}
                                    key={h.key}
                                    data-disabled={h.disabled && 'disabled'}
                                    data-key={h.key}
                                    draggable={draggable}
                                    >
                                        <article class="p-header-setting-checkbox">
                                            <span class="p-header-setting-shit">
                                                {draggable && <DragSortSvg />}
                                            </span>
                                            <Checkbox checked={h.checked} disabled={h.disabled} data-index={hi} onChange={checkboxChange} />
                                        </article>
                                        <article class="p-header-setting-words">
                                            <span class="p-header-setting-text">{h.text}</span>
                                        </article>
                                    </section>
                                ))
                            }
                        </div>
                        <div class={['p-header-setting-handle', (currentData && currentData.length > 7) && 'p-header-setting-handle-shadow']}>
                            <section class="p-header-setting-default" onClick={recoverDefault}>重置</section>
                            <section class="p-header-setting-btn">
                                <Button type="default" size="small" onClick={cancel}>取消</Button>
                                <Button type="blue" size="small" onClick={confirm}>确定</Button>
                            </section>
                        </div>
                    </div>
                </Transition>
            );
        };
    }
});

export default HeaderSetting;
