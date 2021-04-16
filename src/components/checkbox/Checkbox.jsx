import './style.styl';
import { defineComponent } from 'vue';

import TextEllipsis from '../static/utils/TextEllipsis';

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
        }
    },
    // emits: ['change', 'update:checked'],
    setup(props, { attrs, slots, emit }) {
        const handleChange = (e) => {
            const { disabled, checked, stopPropagation } = props;
            if (stopPropagation) e.stopPropagation();
            if (disabled) return;
            const { attr, onChange } = attrs;
            let status;
            if (checked === 'checked') status = 'uncheck';
            else status = 'checked';

            if (onChange) emit('change', status, attr);
            else emit('update:checked', status);
        };
        return () => {
            const { disabled, checked } = props;
            return (
                <div class={['p-checkbox', disabled && 'p-checkbox-disabled']} onClick={handleChange}>
                    <i class={['p-checkbox-box', `p-checkbox-${checked}`]}/>
                    { slots.default && <span className="p-checkbox-text" onMouseenter={TextEllipsis}>{slots.default()}</span> }
                </div>
            );
        };
    }
});

export default Checkbox;
