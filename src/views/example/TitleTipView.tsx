import { defineComponent } from 'vue';
import TitleTip from '@/components/titleTip';

const TitleTipView = defineComponent({
    name: 'TitleTipView',
    directives: {
        title: {
            mounted: TitleTip,
            beforeUnmount: TitleTip.remove
        }
    },
    setup() {
        const title = { width: 400, text: 'aaaaaaa' };
        return () => (
            <>
                <h3>TitleTip在当行文本有省略号时才会出现弹出层提示</h3>
                <div v-title style={{ display: 'inline-block' }}>
					sdfgsdg
                </div>
                <br />
                <br />
                <div v-title={title} style={{ display: 'inline-block' }}>
					sdfgsdg
                </div>
            </>
        );
    }
});

export default TitleTipView;
