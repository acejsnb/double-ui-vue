import './style.styl';

import { defineComponent } from 'vue';

const Loading16px = defineComponent({
    name: 'Loading16px',
    props: {
        color: {
            type: String,
            default: '#fff'
        }
    },

    setup(props) {
        return () => (
            <div class="p-loading16px">
                <svg class="p-loading16px-line" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="M9,1 A7,7 0 0,1 15,7" fill="none" stroke-width="1" stroke={props.color} />
                </svg>
            </div>
        );
    }
});

export default Loading16px;
