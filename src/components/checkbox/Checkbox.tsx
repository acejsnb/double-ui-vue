import './style.styl';
import { defineComponent, getCurrentInstance } from 'vue';
import TextEllipsis from '@/utils/TextEllipsis';

const Checkbox = defineComponent({
    name: 'Checkbox',
    props: {
        /**
		 * checked-选中
		 * uncheck-未选中
		 * notNull-半选
		 */
        checked: {
            type: String,
            default: 'uncheck'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        // 阻止冒泡
        stopPropagation: {
            type: Boolean,
            default: false
        },
        attr: {
            type: String
        },
        onChange: {
            type: Function,
            default: () => {}
        }
    },
    // emits: ['change', 'update:checked'],
    setup(props, { emit }) {
        const { vnode } = getCurrentInstance();
        const handleChange = (e: MouseEvent) => {
            const { disabled, checked, stopPropagation, attr } = props;
            if (stopPropagation) e.stopPropagation();
            if (disabled) return;
            let status;
            if (checked === 'checked') status = 'uncheck';
            else status = 'checked';

            if (vnode.props.onChange) emit('change', status, attr);
            else emit('update:checked', status);
        };
        return { handleChange };
    },
    render() {
        const { $slots: slots, disabled, checked, handleChange } = this;
        return (
            <div class={['d-checkbox', disabled && 'd-checkbox-disabled']} onClick={handleChange}>
                <i class={['d-checkbox-box', `d-checkbox-${checked}`]} />
                {slots.default && (
                    <span class="d-checkbox-text" onMouseenter={TextEllipsis}>
                        {slots.default()}
                    </span>
                )}
            </div>
        );
    }
});

export default Checkbox;
