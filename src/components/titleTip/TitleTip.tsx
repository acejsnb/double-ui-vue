import './style.styl';
import { defineComponent } from 'vue';

const TitleTip = defineComponent({
    name: 'TitleTip',
    props: {
        title: {
            type: String,
            default: ''
        },
        left: {
            type: [String, Number],
            default: ''
        },
        top: {
            type: [String, Number],
            default: ''
        },
        maxWidth: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props) {
        return () => {
            const { title, left, top, maxWidth } = props;
            return (
                <div
                    class="d-tooltip"
                    style={{ left: `${left}px`, top: `${top}px`, maxWidth: `${maxWidth}px` }}
                >
                    {title}
                </div>
            );
        };
    }
});

export default TitleTip;
