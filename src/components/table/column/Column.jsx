import './style.styl';

import { defineComponent } from 'vue';
import TextEllipsis from '../../static/utils/TextEllipsis';

const Column = defineComponent({
    name: 'Column',
    props: {
        border: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'tbody'
        },
        columns: {
            type: Array,
            default: () => []
        },
        item: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        return ({
            border, tag, columns, item
        }) => (
            <tr class={['m-table-tr', `m-table-tr-${tag}`, border && 'm-table-tr-border']}>
                {columns.map(c => (
                    tag === 'thead'
                        ? <th class="m-table-th">
                            <div class={['m-table-cell']}>
                                <section class="m-table-cell-text" onMouseenter={TextEllipsis}>{c.field}</section>
                            </div>
                        </th>
                        : <td class="m-table-td">
                            <div class={['m-table-cell']}>
                                <section class="m-table-cell-text" style={item[c.key].color && { color: item[c.key].color }}
                                    onMouseenter={TextEllipsis}
                                >{item[c.key].text}</section>
                            </div>
                        </td>
                ))}
            </tr>
        );
    }
});

export default Column;
