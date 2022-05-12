import './style.styl';
import { defineComponent, provide, reactive, toRaw, ref } from 'vue';
import { isNullObj } from 'js-func-tools';
import type { AntType, SetRules } from './type';

const Form = defineComponent({
    name: 'Form',
    props: {
        name: {
            type: String,
            default: 'dui-form'
        }
    },
    emits: ['submit', 'reset'],
    setup(props, { emit, slots }) {
        // 验证规则
        const errRules = reactive<AntType>({});
        // 获取到的对象
        const params = reactive<AntType>({});
        // 缓存Item传来的规则
        const setRules: SetRules = (name, options) => {
            errRules[name] = options;
        };
        provide('setRules', setRules);
        // 重置状态
        const resetStatus = ref(false);
        provide('resetStatus', resetStatus);

        // 提交
        const submit = (e: Event) => {
            e.preventDefault();
            const { elements } = e.target as HTMLFormElement;
            const els = Array.from(elements).filter((tag) => tag.tagName === 'INPUT');
            const elsLen = els.length;
            els.forEach((tag) => {
                const { name, value } = tag as HTMLInputElement;
                params[name] = value;
            });
            new Promise((resolve) => {
                const statusArr: boolean[] = [];
                Object.keys(params).forEach((name) => {
                    statusArr.push(errRules[name].check(params));
                });

                if (statusArr.length === elsLen && statusArr.every((d) => d === true)) {
                    resolve(toRaw(params));
                }
            }).then((res) => {
                emit('submit', res);
            });
        };
        // 重置
        const reset = () => {
            if (!isNullObj(toRaw(errRules))) {
                Object.values(errRules).forEach((d) => {
                    d.resetErrText();
                });
            }
            emit('reset');
        };

        return () => (
            <form class="d-form" name={props.name} onSubmit={submit} onReset={reset}>
                {slots.default && slots.default()}
            </form>
        );
    }
});

export default Form;
