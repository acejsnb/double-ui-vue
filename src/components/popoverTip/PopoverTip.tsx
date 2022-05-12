import './style.styl';

import { PropType, Ref, defineComponent, onBeforeUnmount, watch, reactive } from 'vue';

import TipModalHandle, { Instance } from './TipModalHandle';

interface IState {
	tipShow: boolean;
}

const PopoverTip = defineComponent({
    name: 'PopoverTip',
    props: {
        // 触发器
        tag: {
            type: Object as PropType<HTMLElement>,
            default: () => ({})
        },
        // 数字标签
        countTag: {
            type: Object as PropType<HTMLElement>,
            default: () => ({})
        },
        // 内容
        content: {
            type: String || (Object as PropType<Ref<string>>),
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
        let tipModal: Instance;
        let enterTimer: number;
        let leaveTimer: number;
        const state = reactive<IState>({
            tipShow: false // 提示框是否显示
        });
        // 改变提示框状态
        const changeTipShow = (status: boolean): void => {
            state.tipShow = status;
            if (tipModal) tipModal.vm.component.props.tipShow = status;
        };
        PopoverTip.changeTipShow = changeTipShow;
        const tipHandle = (str: string): void => {
            if (str === 'enter') {
                clearTimeout(leaveTimer);
                leaveTimer = null;
            } else {
                leaveTimer = setTimeout(() => {
                    changeTipShow(false);
                }, 500);
            }
        };
        const mouseEnter = () => {
            if (leaveTimer) {
                clearTimeout(leaveTimer);
                leaveTimer = null;
            }
            if (!props.content || props.dropShow || state.tipShow) return;
            enterTimer = setTimeout(() => {
                if (tipModal) {
                    tipModal.resetPosition();
                } else {
                    tipModal = TipModalHandle({
                        tipShow: state.tipShow,
                        props,
                        changeTipShow,
                        tipHandle
                    });
                    if (tipModal) tipModal.resetPosition();

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

        watch(
            () => props.content,
            (n, o) => {
                if (n === o || !tipModal) return;
                tipModal.vm.component.props.content = n;
            }
        );

        onBeforeUnmount(() => {
            if (enterTimer) clearTimeout(enterTimer);
            if (leaveTimer) clearTimeout(leaveTimer);
            if (tipModal) tipModal.remove();
        });

        return () => (
            // <div class="m-popover" onMouseenter={mouseEnter} onMouseleave={mouseLeave}>
            <span onMouseenter={mouseEnter} onMouseleave={mouseLeave}>
                {slots.default()}
            </span>
        );
    }
});

export default PopoverTip;
