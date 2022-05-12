import { getPlaceByTrigger } from 'js-func-tools';
import CreateInstance, { Instance } from '@/utils/CreateInstance';
import DB from './DropBox';

import { Item } from '../types';

const resetPosition = (instance: Instance) => {
    const { vm, tag } = instance;
    const {
        props: { alignRight = false },
        el
    } = vm;

    const { left, top, isDown } = getPlaceByTrigger({
        trigger: tag,
        dom: el as HTMLElement,
        isRight: !!alignRight
    });
    vm.component.props.position = isDown;
    // 设置位置
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
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
