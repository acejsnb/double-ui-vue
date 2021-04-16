import './style.styl';

import { defineComponent } from 'vue';
import Column from '../column/Column';

const Grid = defineComponent({
    name: 'Grid',
    props: {
        tag: {
            type: String,
            default: 'tbody'
        },
        width: {
            type: [Number, String],
            default: 0
        },
        border: {
            type: Boolean,
            default: false
        },
        cols: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        return ({
            tag, width, border, cols, columns, data
        }) => (
            <table class={['m-table-grid', `m-table-grid-${tag}`]} style={{ width: `${width}px` }}>
                <colgroup>
                    {cols.map(w => <col width={w.width} key={w.id}/>)}
                </colgroup>
                {
                    tag === 'thead'
                        ? (
                            <thead>
                                <Column key="thead" border={border} tag="thead" columns={columns} />
                            </thead>
                        )
                        : (
                            <tbody>
                                {data.map(d => <Column border={border} key={d.id} columns={columns} item={d} />)}
                            </tbody>
                        )
                }
            </table>
        );
    }
});

export default Grid;
