// 设置排序
const SortByParams = (data, params) => data.sort((a, b) => {
    const av = a[params],
        bv = b[params];
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
});

export default SortByParams;
