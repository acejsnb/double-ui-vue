import './style.styl';
import { defineComponent } from 'vue';
import Item from './Item';

const Form = defineComponent({
    name: 'Form',
    emits: ['submit', 'cancel'],
    setup(props, { slots }) {
        const submit = (e: Event) => {
            // console.log(e);
            const { elements } = e.target as HTMLFormElement;
            // console.log(elements);
            Array.from(elements).forEach((tag) => {
                console.log(tag);
            });
        };
        const reset = () => {
            console.log('reset');
        };
        return () => (
            <form class="d-form" onSubmit={submit} onReset={reset}>
                {slots.default && slots.default()}
            </form>
        );
    }
});

Form.Item = Item;
export default Form;
