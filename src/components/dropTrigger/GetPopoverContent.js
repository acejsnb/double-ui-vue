// 得到popover的提示内容
const GetPopoverContent = (data) => {
    if (data instanceof Array && JSON.stringify(data).length > 4) {
        const names = [];
        data.forEach(d => {
            names.push(d.name);
        });
        return names.toString().replace(/,/g, '、');
    }
    return '';
};

export default GetPopoverContent;
