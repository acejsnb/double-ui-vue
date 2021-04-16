import './index.styl';

import { defineComponent } from 'vue';

const Button = defineComponent({
    name: 'Button',
    props: {
        type: {
            type: String,
            default: 'default' // default blue word
        },
        size: {
            type: String,
            default: 'medium' // large medium small
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props, { emit, slots }) {
        const clickHandle = () => {
            emit('click');
        };

        return () => {
            const {
                type, size, disabled, width
            } = props;
            return <div class={[
                'm-button',
                `m-button-${type}`,
                `m-button-${size}`,
                `m-button-${disabled ? 'disabled' : 'normal'}`
            ]}
            type={type}
            style={{ width: `${width}px` }}
            onClick={clickHandle}
            >
                <section className="m-button-content">
                    <span className="m-button-text">{slots.default()}</span>
                </section>
            </div>;
        };
    }
});

export default Button;
