import './style.styl';

import {
    defineComponent, reactive, computed, Transition, isRef
} from 'vue';

import IsIE from '../static/utils/IsIE';

const TipModal = defineComponent({
    name: 'TipModal',
    props: {
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
        tipHandle: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const state = reactive({
            position: false,
            show: false
        });
        TipModal.state = state;
        // 计算被遮挡的宽度
        const getScrollWidth = (text) => {
            const maxWidth = 452,
                div = document.createElement('div');
            div.innerText = text;
            div.style.position = 'absolute';
            div.style.left = '0';
            div.style.bottom = '0';
            div.style.zIndex = '-100';
            div.style.display = 'inline-block';
            div.style.height = '0';
            div.style.opacity = '0';
            div.style.overflow = 'hidden';
            div.style.whiteSpace = 'nowrap';
            div.style.fontSize = '14px';
            document.body.appendChild(div);
            const { scrollWidth } = div;
            if (IsIE()) div.removeNode(true);
            else div.remove();
            return scrollWidth > maxWidth ? (scrollWidth - maxWidth) : 0;
        };
        const contentArr = computed(() => {
            const content = isRef(props.content) ? props.content.value : props.content;
            if (!content) return [];
            return content.split('、').map((d, i) => ({ id: `content-${i}`, text: d, scroll: d.length > 32 ? getScrollWidth(d) : 0 }));
        });

        // 出发鼠标事件
        const popoverTipHandle = (str) => {
            if (!props.split) return;
            props.tipHandle(str);
        };
        // 鼠标移入弹窗上关闭弹窗
        const contentEnter = () => {
            if (props.split) return;
            state.show = false;
        };

        return () => {
            const { split, content } = props,
                { position, show } = state;

            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div v-show={show}
                        class={[
                            'p-popover-tip',
                            split ? 'p-popover-tip-split' : 'p-popover-tip-words',
                            position ? 'p-popover-tip-bottom' : 'p-popover-tip-top'
                        ]}
                        onWheel={e => e.stopPropagation()}
                        onMouseenter={() => popoverTipHandle('enter')}
                        onMouseleave={() => popoverTipHandle('leave')}
                    >
                        <section class="p-popover-tip-content" onMouseenter={contentEnter}>
                            {
                                split
                                    ? (
                                        <>
                                            {
                                                contentArr.value.map(item => (
                                                    <article class={['p-popover-tip-content-item', item.scroll && 'p-popover-tip-content-item-before']}>
                                                        <span key={item.id}
                                                            class="p-popover-tip-item-text"
                                                            style={{ transform: `translateX(${-item.scroll}px)` }}
                                                        >{item.text}</span>
                                                    </article>
                                                ))
                                            }
                                        </>
                                    ) : (<article class="p-popover-tip-content-words">{isRef(content) ? content.value : content}</article>)
                            }
                        </section>
                        <section class="p-popover-tip-triangle"/>
                    </div>
                </Transition>
            );
        };
    }
});

export default TipModal;
