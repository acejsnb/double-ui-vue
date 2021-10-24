import { defineComponent, ref } from 'vue';

import Button from '@/components/button/Button';

const ButtonView = defineComponent({
    name: 'ButtonView',
    setup() {
        const loading = ref(true);
        const changeLoading = () => {
            loading.value = true;
        };
        return () => (
            <div class="component component-padding">
                <Button>default</Button>
                <Button type="blue" loading={loading.value} onClick={changeLoading}>blue</Button>
                <Button type="word">word</Button>
            </div>
        );
    }
});

export default ButtonView;
