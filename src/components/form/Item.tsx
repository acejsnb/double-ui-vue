import { defineComponent } from 'vue';

const FormItem = defineComponent({
    name: 'FormItem',
    props: {
        label: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots }) {
        return () => (
            <div class="d-form-item">
                {props.label && (
                    <section class="d-form-item-label">
                        {props.required && <i class="d-form-item-required">*</i>}
                        <span class="d-form-item-title">{props.label}</span>
                    </section>
                )}
                {slots.default && slots.default()}
            </div>
        );
    }
});

export default FormItem;
