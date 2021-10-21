// 得到popover的提示内容
export interface Item {
	id: string;
	name: string;
	disabled?: boolean;
	[key: string]: any;
}
const GetPopoverContent = (data: Item[] | Item): string => {
	if (data instanceof Array && JSON.stringify(data).length > 4) {
		const names: string[] = [];
		data.forEach((d) => {
			names.push(d.name);
		});
		return names.toString().replace(/,/g, '、');
	}
	return '';
};

export default GetPopoverContent;
