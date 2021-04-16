import './style.styl';

import { defineComponent, Transition } from 'vue';

import IconClose from '../static/iconSvg/icon_close_white.svg';
import HintError from '../static/iconSvg/hint_error.svg';
import HintInfo from '../static/iconSvg/hint_info.svg';
import HintSuccess from '../static/iconSvg/hint_success.svg';
import HintWaring from '../static/iconSvg/hint_waring.svg';

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
                    <div v-show={show} class={['p-message', `p-message-${type}`]}>
                        <section class="p-message-hint">
                            {types.includes(type) && strategy[type]()}
                        </section>
                        <section class="p-message-text">{message}</section>
                        <section class="p-message-close" onClick={removeMessage}><IconClose /></section>
                    </div>
                </Transition>
            );
        };
    }
});

export default Message;
