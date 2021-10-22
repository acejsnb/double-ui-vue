import './style.styl';

import { defineComponent, Transition } from 'vue';

import IconClose from '@/assets/iconSvg/icon_close_white.svg';
import HintError from '@/assets/iconSvg/hint_error.svg';
import HintInfo from '@/assets/iconSvg/hint_info.svg';
import HintSuccess from '@/assets/iconSvg/hint_success.svg';
import HintWaring from '@/assets/iconSvg/hint_waring.svg';

const Message = defineComponent({
    name: 'Message',
    props: {
        type: {
            type: String,
            default: 'info'
        },
        message: {
            type: String,
            default: ''
        },
        time: {
            type: Number,
            default: 3
        },
        show: {
            type: Boolean,
            default: false
        },
        removeMessage: {
            type: Function,
            default: () => {}
        }
    },
    setup(props) {
        const types = ['info', 'success', 'warning', 'error'];

        const strategy = {
            info: () => <HintInfo />,
            success: () => <HintSuccess />,
            warning: () => <HintWaring />,
            error: () => <HintError />
        };

        // 移除当前节点
        const removeMessage = () => {
            props.removeMessage();
        };

        return () => {
            const { type, message, show } = props;
            return (
                <Transition name="fadeDownUpUi">
                    <div v-show={show} class={['d-message', `d-message-${type}`]}>
                        <section class="d-message-hint">
                            {types.includes(type) && strategy[type]()}
                        </section>
                        <section class="d-message-text">{message}</section>
                        <section class="d-message-close" onClick={removeMessage}>
                            <IconClose />
                        </section>
                    </div>
                </Transition>
            );
        };
    }
});

export default Message;
