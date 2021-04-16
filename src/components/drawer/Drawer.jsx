import './style.styl';

import {
    defineComponent, ref, reactive, watch, onMounted, onBeforeUnmount, nextTick, Transition
} from 'vue';

import IconClose from '../static/iconSvg/icon_close.svg';
import Loading16px from '../loading16px/Loading16px';

const Drawer = defineComponent({
    name: 'Drawer',
    props: {
        /**
         * 侧拉窗显示状态
         */
        show: {
            type: Boolean,
            default: false,
            require: true
        },
        // 是否显示遮罩
        shadow: {
            type: Boolean,
            default: false
        },
        // 点击遮罩是否穿透
        penetrate: {
            type: Boolean,
            default: false
        },
        /**
         * 是否聚焦（也就是失去交掉是否关闭侧拉窗）
         */
        focus: {
            type: Boolean,
            default: false
        },
        /**
         * 是否固定底部操作栏
         */
        bottom: {
            type: Boolean,
            default: false
        },
        // 加载更多
        loadingMore: {
            type: Boolean,
            default: false
        },
        // 加载中...
        loading: {
            type: Boolean,
            default: false
        },
        // 弹窗距离顶部距离是多少
        top: {
            type: [String, Number],
            default: ''
        },
        // 当前组件的id，具有唯一性
        componentId: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit, slots }) {
        const state = reactive({
            autoClose: false, // 是否失去焦点就关闭
            scrollTop: 0, // 滚动条的位置
            tabIndex: -1,
            clientWidth: 0, // drawerBox宽
            clientHeight: 0 //
        });

        const drawerBox = ref(null);

        watch(() => props.focus, (n, o) => {
            if (n === o) return;
            state.autoClose = n;
        }, { immediate: true });

        // 关闭侧拉窗
        const onClose = () => {
            emit('close', false);
        };

        // 检查点击区域
        const checkPointer = (e) => {
            const { focus, show } = props;
            if (!focus || !show) return;
            const { innerWidth } = window,
                { clientWidth } = drawerBox.value,
                { x } = e;
            if (x < (innerWidth - clientWidth)) onClose();
        };

        onMounted(() => {
            nextTick(() => {
                window.addEventListener('mousedown', checkPointer, false);
            });
        });
        onBeforeUnmount(() => {
            window.removeEventListener('mousedown', checkPointer);
        });

        // 监听页面触底
        const contentScroll = (e) => {
            if (props.loadingMore) return;
            nextTick(() => {
                const { target } = e;
                const { scrollTop, scrollHeight } = target;
                const h = target.getBoundingClientRect().height;
                if (scrollTop + h === scrollHeight) {
                    // 触底了
                    emit('getMore');
                }
            });
        };

        return () => {
            const {
                show, shadow, penetrate, top, componentId, bottom, loadingMore, loading
            } = props;
            return (
                <Transition name="slideRightLeft">
                    <div v-show={show} class="p-drawer-box">
                        {shadow && <div class={['p-drawer-shadow', penetrate && 'p-drawer-shadow-event']} />}
                        <div ref={drawerBox} class="p-drawer" style={{ top: `${top}px`, height: `calc(100% - ${top}px)` }}>
                            <div class="p-drawer-title">
                                <section class="p-drawer-title-content">{slots?.title()}</section>
                                <i class="p-drawer-title-icon"><IconClose onClick={onClose} /></i>
                            </div>
                            <div id={componentId} class={['p-drawer-content', bottom && 'p-drawer-content-bottom']} onScroll={contentScroll}>
                                {slots?.content()}
                                {
                                    loadingMore && (
                                        <section class="p-drawer-content-loading">
                                            <Loading16px class="p-loading16px-drawer" />
                                            <span>加载中...</span>
                                        </section>
                                    )
                                }
                            </div>
                            {slots.handle && <div class={['p-drawer-handle', bottom && 'p-drawer-handle-bottom']}>{slots.handle()}</div>}
                            {loading && <div class="p-drawer-loading">
                                <section class="p-drawer-loading-svg">
                                    <Loading16px color="#c3c7cb"/>
                                </section>
                            </div>}
                        </div>
                    </div>
                </Transition>
            );
        };
    }
});

export default Drawer;
