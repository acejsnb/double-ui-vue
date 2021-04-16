import './style.styl';
import {
    defineComponent, ref, reactive, Transition, watch, nextTick
} from 'vue';

import CloneDeep from '../../../utils/CloneDeep';
import Checkbox from '../../checkbox/Checkbox';
import Button from '../../button/Button';
import Message from '../../message';

const SettingDrop = defineComponent({
    name: 'SettingDrop',
    props: {
        position: {
            type: Boolean,
            default: false
        },
        // 数据
        data: {
            type: Array,
            default: () => []
        },
        // 设置可拖动排序
        draggable: {
            type: Boolean,
            default: false
        },
        changeSettingStatus: {
            type: Function,
            default() {}
        },
        checkedHandle: {
            type: Function,
            default() {}
        }
    },
    setup(props) {
        const headerSetting = ref(null);
        const settingContent = ref(null);
        const state = reactive({
            settingStatus: false, // 显示状态
            activeClose: false, // 显示状态
            historyData: [], // 保存的历史数据
            currentData: [], // 当前使用的数据
            dragging: null // 被拖拽的对象
        });
        SettingDrop.state = state;

        watch(() => state.settingStatus, (n, o) => {
            if (!n || n === o) return;
            nextTick(() => {
                headerSetting.value.focus();
            });
        });

        watch(() => props.data, (n = [], o = []) => {
            const nData = JSON.parse(JSON.stringify(n)),
                oData = JSON.parse(JSON.stringify(o));
            if (nData === oData) return;
            state.historyData = CloneDeep(n);
            state.currentData = CloneDeep(n);
        }, { deep: true, immediate: true });

        const settingEnter = () => {
            state.activeClose = false;
        };
        const settingLeave = () => {
            state.activeClose = true;
        };
        // checkbox状态改变
        let msgInfo;
        const checkboxChange = (status, index) => {
            const { currentData } = state;
            const strategy = {
                checked() {
                    currentData[index].checked = status;
                },
                uncheck() {
                    const fData = currentData.every(d => d.checked === 'uncheck');
                    if (fData) {
                        if (msgInfo && !msgInfo.isUnmounted) {
                            msgInfo.changeMessage('至少应选择一项');
                        } else {
                            msgInfo = Message({
                                type: 'info',
                                message: '至少应选择一项'
                            });
                        }
                        currentData[index].checked = 'checked';
                    } else {
                        currentData[index].checked = status;
                    }
                }
            };
            strategy[status]();
        };
        /* 拖拽 - s */
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
        const onDragStart = (e) => {
            const { target } = e;
            const { nodeName, dataset: { disabled } } = target;
            if (nodeName !== 'SECTION' || disabled === 'disabled') return;
            e.dataTransfer.dropEffect = 'move';
            target.className += ' p-header-setting-item-hover';
            state.dragging = target;
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
            const { data } = props;
            state.currentData = CloneDeep(data);
            props.btnClick('reset');
        };
        // 取消按钮
        const cancel = () => {
            state.settingStatus = false;
            setTimeout(() => {
                state.currentData = CloneDeep(state.historyData);
            }, 300);
            props.btnClick('cancel');
        };
        // 确定按钮
        const confirm = () => {
            state.settingStatus = false;
            const { currentData } = state;
            state.historyData = CloneDeep(currentData);
            const checkedData = currentData.filter(d => d.checked === 'checked');
            props.checkedHandle(checkedData, currentData, 'confirm');
        };
        // 失去焦点事件
        const blurSetting = () => {
            setTimeout(() => {
                if (state.settingStatus && state.activeClose) cancel();
            });
        };

        return ({ position, draggable }) => {
            const { settingStatus, currentData } = state;
            return (
                <Transition name={position ? 'selectDownUpExtendTop' : 'selectDownUpExtend'}>
                    <div v-show={settingStatus}
                        ref={headerSetting}
                        class="m-header-setting"
                        tabindex="-1"
                        onBlur={blurSetting}
                        onMouseenter={settingEnter}
                        onMouseleave={settingLeave}
                    >
                        <div class="m-header-setting-content"
                            ref={settingContent}
                            onDragstart={onDragStart}
                            onDragover={onDragOver}
                            onDragend={onDragEnd}
                        >
                            {
                                currentData.map((h, hi) => (
                                    <section key={h.key}
                                        class={[
                                            'm-header-setting-item',
                                            draggable && 'm-header-setting-item-draggable',
                                            h.disabled ? 'm-header-setting-disabled' : 'm-header-setting-normal'
                                        ]}
                                        data-disabled={h.disabled && 'disabled'}
                                        data-key={h.key}
                                        draggable={draggable}
                                    >
                                        <article class="m-header-setting-checkbox">
                                            <span class="m-header-setting-shit">
                                                {draggable && <DragSortSvg/>}
                                            </span>
                                            <Checkbox v-model={[h.checked, 'checked']} disabled={h.disabled} attr={hi} onChange={checkboxChange} />
                                        </article>
                                        <article className="m-header-setting-words">
                                            <span className="m-header-setting-text">{h.field}</span>
                                        </article>
                                    </section>
                                ))
                            }
                        </div>
                        <div class={[
                            'm-header-setting-handle',
                            (currentData && currentData.length > 7) && 'm-header-setting-handle-shadow'
                        ]}
                        >
                            <section class="m-header-setting-default" onClick={recoverDefault}>重置</section>
                            <section class="m-header-setting-btn">
                                <Button size="small" onClick={cancel}>取消</Button>
                                <Button type="blue" size="small" onClick={confirm}>确定</Button>
                            </section>
                        </div>
                    </div>
                </Transition>
            );
        };
    }
});

export default SettingDrop;
