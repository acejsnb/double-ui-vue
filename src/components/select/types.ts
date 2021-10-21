export interface Item {
	id: string;
	name: string;
	checked?: string;
	disabled?: boolean;
	[key: string]: any;
}

export interface IState {
	activeClose: boolean;
	dropShow: boolean;
	dropData: Item[];
	selectedData: Item[] | Item;
	searchData: Item[];
}
