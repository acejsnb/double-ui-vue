import './style.styl';
import { Ref, defineComponent, ref, watch, inject, computed } from 'vue';

const Input = defineComponent({
    name: 'Input',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        maxlength: {
            type: Number,
            default: 20
        },
        placeholder: {
            type: String,
            default: 'placeholder'
        },
        value: {
            type: String,
            default: ''
        },
        errText: {
            type: String,
            default: ''
        }
    },
    emits: ['update:value', 'change'],
    setup(props, { emit }) {
        // 表单item的name
        const name = inject<string>('name');
        // 表单传过来的错误信息
        const formErrText = inject<Ref<string>>('formErrText');
        // 定义错误信息，其中表单的错误信息权重更高
        const errText = computed(() => formErrText.value || props.errText);
        // v-model绑定值
        const inputValue = ref(props.value);
        watch(() => props.value, (n, o) => {
            if (n === o) return;
            inputValue.value = n;
        });
        watch(() => inputValue.value, (n, o) => {
            if (n === o) return;
            if (formErrText?.value) formErrText.value = '';
            emit('update:value', n);
        });

        const change = (e: Event) => {
            const { value } = e.target as HTMLInputElement;
            emit('change', value);
        };

        return () => (
            <span class="d-input-inline">
                <input class={['d-input', errText.value && 'd-input-err']}
                    name={name}
                    type={props.type}
                    placeholder={props.placeholder}
                    maxlength={props.maxlength}
                    v-model={inputValue.value}
                    onChange={change}
                />
                {errText.value && <i class="d-input-err-text">{errText.value}</i>}
            </span>
        );
    }
});

export default Input;
