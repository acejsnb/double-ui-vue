import './style.styl';

import {
    defineComponent, onBeforeUnmount, watch
} from 'vue';

import TipModalHandle from './TipModalHandle';

const PopoverTip = defineComponent({
    name: 'PopoverTip',
    props: {
        // 触发器
        tag: {
            type: Object,
            default: () => ({})
        },
        // 数字标签
        countTag: {
            type: Object,
            default: () => ({})
        },
        // 内容
        content: {
            type: [String, Object],
            default: ''
        },
        // 是否通过拆分渲染内容
        split: {
            type: Boolean,
            default: true
        },
        // 下拉列表是否显示状态
        dropShow: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        let tipModal = null,
            enterTimer = null,
            leaveTimer = null;
        const mouseEnter = () => {
            if (!props.content || props.dropShow) return;
            if (leaveTimer) {
                clearTimeout(leaveTimer);
                leaveTimer = null;
            }
            enterTimer = setTimeout(() => {
                if (tipModal) {
                    tipModal.resetPosition();
                } else {
                    tipModal = TipModalHandle({
                        props,
                        tipHandle(str) {
                            if (str === 'enter') {
                                clearTimeout(leaveTimer);
                                leaveTimer = null;
                            } else {
                                leaveTimer = setTimeout(() => {
                                    tipModal.setShow(false);
                                }, 500);
                            }
                        }
                    });
                    if (tipModal) tipModal.resetPosition(tipModal);

                    PopoverTip.tipModal = tipModal;
                }
            }, 360);
        };
        const mouseLeave = () => {
            if (!props.content) return;
            if (enterTimer) {
                clearTimeout(enterTimer);
                enterTimer = null;
            }
            leaveTimer = setTimeout(() => {
                if (tipModal) tipModal.setShow(false);
            }, 500);
        };

        watch(() => props.content, (n, o) => {
            if (n === o || !tipModal) return;
            tipModal.component.props.content = n;
        });

        onBeforeUnmount(() => {
            if (enterTimer) clearTimeout(enterTimer);
            if (leaveTimer) clearTimeout(leaveTimer);
            if (tipModal) tipModal.remove();
        });

        return () => (
            <div class="m-popover" onMouseenter={mouseEnter} onMouseleave={mouseLeave}>{slots.default()}</div>
        );
    }
});

export default PopoverTip;
