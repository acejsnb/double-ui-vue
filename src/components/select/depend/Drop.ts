import CalcTargetPosition from '@/utils/CalcTargetPosition';
import CreateInstance, { Instance } from '@/utils/CreateInstance';
import DB from './DropBox';

import { Item } from '../types';

const resetPosition = (instance: Instance) => {
	const { vm, tag } = instance;
	const {
		props: { data = [], width, alignRight = false },
		el
	} = vm;

	const hei = data.length * 38 + 16;
	let height;
	if (hei < 208) height = hei;
	else height = 208;
	const { X, Y, P } = CalcTargetPosition(tag, height, width, alignRight);
	vm.component.props.position = P;
	// 设置位置
	el.style.top = `${Y}px`;
	el.style.left = `${X}px`;
};

export interface Props {
	parentState: object;
	width: string | number;
	maxCount: string | number;
	position?: boolean;
	alignRight: boolean;
	multiple: boolean;
	selectedId: string | string[] | unknown;
	data: Item[];
	change(item: Item): void;
	cancel(): void;
}
type TOptions = {
	tag: HTMLElement;
	props: Props;
};
const DropBox = ({ tag, props }: TOptions): Instance =>
	CreateInstance<Props>({
		tag,
		props,
		component: DB,
		resetPosition
	});

export type { Instance };
export default DropBox;
