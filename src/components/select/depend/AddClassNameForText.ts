/**
 * 给字符串添加class类名
 * @param text1 目标元素
 * @param text2 搜索输入的值
 * @param className 类名
 * @constructor
 */
const AddClassNameForText = (text1: string, text2: string, className: string) => {
    const tArr1 = text1.split('');
    const tArr2 = Array.from(new Set(text2.split('')));
    const formatArr = tArr1.map((d) => {
        if (tArr2.includes(d)) return `<span class="${className}">${d}</span>`;
        return d;
    });
    return formatArr.join('');
};
const GetSameItem = (text1: string, text2: string) => {
    const tArr1 = text1.split('');
    const tArr2 = text2.split('');
    return tArr1.filter((d) => tArr2.includes(d)).join('');
};

export default AddClassNameForText;
export { GetSameItem };
