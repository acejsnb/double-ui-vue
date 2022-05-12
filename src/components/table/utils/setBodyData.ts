import { uuid } from 'js-func-tools';
import { DataItem } from '../type';

// 设置表体数据
interface RData {
    id: string
    data: DataItem[];
}
type SetBodyData = (len: number, data: DataItem[], size?: number) => RData[]
const setBodyData: SetBodyData = (len, data, size = 50) => {
    if (len < 200) return [{ id: uuid(5), data }];
    const dataNum = Math.ceil(data.length / size);
    const arr: RData[] = [];
    let index = 0;
    while (index < dataNum) {
        arr[index] = { id: uuid(5), data: data.slice(index * size, (index + 1) * size) };
        index++;
    }
    return arr;
};

export default setBodyData;
