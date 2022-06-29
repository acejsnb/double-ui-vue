import './style.styl';

import { defineComponent } from 'vue';

const MiniLoading = defineComponent({
    name: 'MiniLoading',
    props: {
        color: {
            type: String,
            default: '#fff'
        }
    },

    setup(props) {
        return () => (
            <div class="d-min-loading">
                <svg
                    class="d-min-loading-line"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9,1 A7,7 0 0,1 15,7"
                        fill="none"
                        stroke-width="1"
                        stroke={props.color}
                    />
                </svg>
            </div>
        );
    }
});

export default MiniLoading;
