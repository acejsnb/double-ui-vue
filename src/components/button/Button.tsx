import './index.styl';
import MiniLoading from '@/components/miniLoading/MiniLoading';

import { defineComponent, PropType } from 'vue';

const Button = defineComponent({
    name: 'DButton',
    props: {
        type: {
            type: String as PropType<'default' | 'blue' | 'word'>,
            default: 'default' // default blue word
        },
        size: {
            type: String as PropType<'large' | 'medium' | 'small'>,
            default: 'medium' // large medium small
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: ''
        },
        htmlType: {
            type: String as PropType<'button' | 'submit' | 'reset' | undefined>,
            default: 'button'
        },
        loading: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    emits: ['click'],
    setup(props, { emit, slots }) {
        const clickHandle = () => {
            emit('click');
        };

        return () => {
            const { type, size, disabled, width, htmlType, loading } = props;
            return (
                <button
                    type={htmlType}
                    class={[
                        'd-button',
                        `d-button-${type}`,
                        `d-button-${size}`,
                        `d-button-${disabled ? 'disabled' : 'normal'}`
                    ]}
                    style={{ width: `${width}px` }}
                    onClick={clickHandle}
                >
                    <section class="d-button-content">
                        {loading && <span class="d-button-loading"><MiniLoading/></span>}
                        <span class="d-button-text">{slots.default && slots.default()}</span>
                    </section>
                </button>
            );
        };
    }
});

export default Button;
