import './style.styl';
import { defineComponent, ref, watch } from 'vue';

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
        const inputValue = ref(props.value);
        watch(() => props.value, (n, o) => {
            if (n === o) return;
            inputValue.value = n;
        });
        watch(() => inputValue.value, (n, o) => {
            if (n === o) return;
            emit('update:value', n);
        });

        const change = (e: Event) => {
            const { value } = e.target as HTMLInputElement;
            emit('change', value);
        };

        return () => (
            <span class="d-input-inline">
                <input class="d-input"
                    type={props.type}
                    placeholder={props.placeholder}
                    maxlength={props.maxlength}
                    v-model={inputValue.value}
                    onChange={change}
                />
                {props.errText && <i class="d-input-err">{props.errText}</i>}
            </span>
        );
    }
});

export default Input;
