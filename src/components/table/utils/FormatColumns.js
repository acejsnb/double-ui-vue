// 格式化列数据
const FormatColumns = (columns) => columns.map(d => {
    d.checked = d.checked || 'checked';
    d.disabled = !!d.disabled;
    return d;
});

export default FormatColumns;
