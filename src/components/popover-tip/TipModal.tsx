import './style.styl';

import { Ref, defineComponent, computed, Transition, isRef, PropType } from 'vue';

const TipModal = defineComponent({
    name: 'TipModal',
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
        position: {
            type: Boolean,
            default: false
        },
        tipShow: {
            type: Boolean,
            default: false
        },
        dropShow: {
            type: Boolean,
            default: false
        },
        // 内容
        content: {
            type: String as PropType<string | Ref<string>>,
            default: ''
        },
        // 是否通过拆分渲染内容
        split: {
            type: Boolean,
            default: true
        },
        changeTipShow: {
            type: Function,
            default: () => {}
        },
        tipHandle: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        // 计算被遮挡的宽度
        const getScrollWidth = (text: string) => {
            const maxWidth = 452;
            const div = document.createElement('div');
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
            document.body.removeChild(div);
            return scrollWidth > maxWidth ? scrollWidth - maxWidth : 0;
        };
        const contentArr = computed(() => {
            const content = isRef(props.content) ? props.content.value : props.content;
            if (!content) return [];
            return (content as string).split('、').map((d, i) => ({
                id: `content-${i}`,
                text: d,
                scroll: d.length > 32 ? getScrollWidth(d) : 0
            }));
        });

        // 出发鼠标事件
        const popoverTipHandle = (str: string) => {
            if (!props.split) return;
            props.tipHandle(str);
        };
        // 鼠标移入弹窗上关闭弹窗
        const contentEnter = () => {
            if (props.split) return;
            props.changeTipShow(false);
        };

        return () => {
            const { split, content, tipShow, position } = props;

            return (
                <Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
                    <div
                        v-show={tipShow}
                        class={[
                            'd-popover-tip',
                            split ? 'd-popover-tip-split' : 'd-popover-tip-words',
                            position ? 'd-popover-tip-bottom' : 'd-popover-tip-top'
                        ]}
                        onWheel={(e) => e.stopPropagation()}
                        onMouseenter={() => popoverTipHandle('enter')}
                        onMouseleave={() => popoverTipHandle('leave')}
                    >
                        <section class="d-popover-tip-content" onMouseenter={contentEnter}>
                            {split
                                ? (
                                    <>
                                        {contentArr.value.map((item) => (
                                            <article
                                                class={[
                                                    'd-popover-tip-content-item',
                                                    item.scroll && 'd-popover-tip-content-item-before'
                                                ]}
                                            >
                                                <span
                                                    key={item.id}
                                                    class="d-popover-tip-item-text"
                                                    style={{
                                                        transform: `translateX(${-item.scroll}px)`
                                                    }}
                                                >
                                                    {item.text}
                                                </span>
                                            </article>
                                        ))}
                                    </>
                                )
                                : (
                                    <article class="d-popover-tip-content-words">
                                        {isRef(content) ? content.value : content}
                                    </article>
                                )}
                        </section>
                        <section class="d-popover-tip-triangle" />
                    </div>
                </Transition>
            );
        };
    }
});

export default TipModal;
