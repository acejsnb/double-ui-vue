import { Ref } from 'vue';
import { uuid } from 'js-func-tools';
import MIN_WIDTH from '../constant';
import { ColumnItem, ColWidthItem } from '../type';

// 计算列宽
type SetColsWidth = (
    column: ColumnItem[], width: number, border: boolean, tableGridRef: Ref<HTMLDivElement>
) => ({ cols: ColWidthItem[], tw: number })
const setColsWidth: SetColsWidth = (column, width, border, tableGridRef) => {
    const len = column.length;
    if (!len) return;
    let tableWidth = 0;
    const propsWidth = width;
    if (propsWidth) tableWidth = propsWidth < MIN_WIDTH ? MIN_WIDTH : propsWidth;
    let totalWidth = Math.floor(
        tableWidth || tableGridRef.value.clientWidth
    );
    totalWidth = totalWidth < MIN_WIDTH ? MIN_WIDTH : totalWidth;
    // 平均宽
    const aveWidth = Math.floor(totalWidth / len);
    // 余宽
    const remWidth = totalWidth % len;
    let cols: Array<ColWidthItem> = Array.from(
        new Array(len - 1),
        () => ({ id: uuid(5), w: aveWidth })
    );
    cols.push({ id: uuid(5), w: aveWidth + remWidth });
    if (border) {
        // 如果设置了竖边框，需要把索引大于0的每列宽度减1
        cols = cols.map((d, i) => {
            if (i) d.w -= 1;
            return d;
        });
    }
    return { cols, tw: tableWidth };
};

export default setColsWidth;
