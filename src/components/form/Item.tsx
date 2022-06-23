import { PropType, Ref, defineComponent, provide, inject, ref } from 'vue';
import { FormValidateRule, formValidate } from 'js-func-tools';
import type { AntType, SetRules } from './type';

const FormItem = defineComponent({
    name: 'FormItem',
    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        confirmName: {
            type: String,
            default: ''
        },
        classes: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        rules: {
            type: Array as PropType<FormValidateRule[]>,
            default: []
        }
    },
    setup(props, { slots }) {
        // 将name属性传给input
        provide<string>('name', props.name);
        const formErrText = ref('');
        provide<Ref<string>>('formErrText', formErrText);
        // 设置验证规则
        const setRules = inject<SetRules>('setRules');
        const success = () => {
            formErrText.value = '';
        };
        // @ts-ignore
        const fail = (value: string, message?: string) => {
            formErrText.value = message;
        };
        // 验证value
        const checkValue = (params: AntType) => {
            const { name, confirmName, rules } = props;
            const value = params[name];
            const confirmValue = params[confirmName];
            return formValidate({
                rules, value, success, fail, confirmValue
            });
        };
        if (props.name && props.rules && props.rules.length) {
            setRules(
                props.name,
                {
                    rules: props.rules,
                    confirmName: props.confirmName,
                    check: checkValue,
                    resetErrText() {
                        formErrText.value = '';
                    }
                }
            );
        }

        return () => (
            <div class={['d-form-item', props.classes]}>
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
