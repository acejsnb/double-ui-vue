import { defineComponent } from 'vue';

const ButtonView = defineComponent({
    name: 'ButtonView',
    setup() {
        return () => (
            <div class="component component-padding">
                <Button>default</Button>
                <Button type="blue">blue</Button>
                <Button type="word">word</Button>
            </div>
        );
    }
});

export default ButtonView;
