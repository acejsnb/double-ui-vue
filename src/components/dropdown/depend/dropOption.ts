import { getPlaceByTrigger } from 'js-func-tools';
import CreateInstance, { Instance } from '@/utils/CreateInstance';
import D, { Item } from './DOption';

const resetPosition = (instance: Instance) => {
    const { vm, tag } = instance;
    const {
        component: {
            props: { alignRight, translateX, maxCount },
            refs: { dropOption }
        },
        el
    } = vm;

    const maxHeiByCount = (maxCount as number) * 38; // 最大容纳高度
    (dropOption as HTMLElement).style.maxHeight = `${maxHeiByCount}px`;

    const div = document.createElement('div');
    div.className = 'm-drop-content';
    div.innerHTML = el.innerHTML;
    const { left, top, isDown } = getPlaceByTrigger({
        trigger: tag,
        dom: el as HTMLElement,
        // dom: div,
        isRight: !!alignRight
    });
    vm.component.props.position = isDown;
    // 设置位置
    el.style.top = `${top}px`;
    el.style.left = `${left + Number(translateX)}px`;
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
