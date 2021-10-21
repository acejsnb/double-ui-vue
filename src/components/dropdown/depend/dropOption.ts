import CalcTargetPosition from '@/utils/CalcTargetPosition';
import CreateInstance, { Instance } from '@/utils/CreateInstance';
import D, { Item } from './DOption';

type TGetWidth = (data: Item[], minWidth: number, maxWidth: number) => number;
// 获取宽度
const GetWidth: TGetWidth = (data, minWidth, maxWidth) => {
	const { body } = document;
	const tag = document.createElement('div');
	tag.className = 'p-drop-content';
	if (minWidth) tag.style.minWidth = `${minWidth}px`;
	if (maxWidth) tag.style.maxWidth = `${maxWidth}px`;
	tag.style.height = '0';
	tag.style.zIndex = '-100';
	let html = '<div class="p-drop-option">';
	data.forEach((d) => {
		html += `<section class="p-drop-option-item"><span>${d.name}</span></section>`;
	});
	html += '</div>';

	tag.innerHTML = html;
	body.appendChild(tag);
	const { width } = tag.getBoundingClientRect();
	body.removeChild(tag);
	return width;
};

const resetPosition = (instance: Instance) => {
	const { vm, tag } = instance;
	const {
		component: {
			props: { data, minWidth, maxWidth, alignRight, translateX, maxCount },
			refs: { dropOption }
		},
		el
	} = vm;
	const width =
		minWidth && maxWidth && minWidth === maxWidth
			? maxWidth
			: GetWidth(data as Item[], Number(minWidth), Number(maxWidth));

	// const baseHei = 16 + (openSearch && 40), // 基本高度
	const h = (data as Item[]).length * 38;
	const maxHeiByCount = (maxCount as number) * 38; // 最大容纳高度
	let height;
	if (h < maxHeiByCount) height = h;
	else height = maxHeiByCount;
	const { X, Y, P } = CalcTargetPosition(tag, height, Number(width), !!alignRight);
	vm.component.props.position = P;
	// 设置位置
	el.style.top = `${Y}px`;
	el.style.left = `${X + Number(translateX)}px`;
	(dropOption as HTMLElement).style.maxHeight = `${maxHeiByCount}px`;
};

interface Props {
	parentState: object;
	position?: boolean;
	openSearch?: boolean;
	alignRight?: boolean;
	arrow?: boolean;
	data: Item[];
	value?: string | number;
	minWidth?: string | number;
	maxWidth?: string | number;
	translateX?: string | number;
	maxCount?: string | number;
	theme?: string;
	trigger?: string;
	placeholder?: string;
	optionClick(id: string, name: string): void;
}

interface Options {
	tag: HTMLElement; // 触发器
	props: Props; // 组件D的props
}

const DropOption = ({ tag, props }: Options): Instance =>
	CreateInstance<Props>({
		tag,
		props,
		component: D,
		resetPosition
	});

export default DropOption;

export type { Instance, Item };
