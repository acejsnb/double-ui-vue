export interface IComponents {
	title: string;
	more: string;
	url: string;
}
// 设置排序
const SortByParams = (data: IComponents[], params: string): IComponents[] =>
    data.sort((a, b) => {
        const av = a[params];
        const bv = b[params];
        if (av < bv) return -1;
        if (av > bv) return 1;
        return 0;
    });

export default SortByParams;
