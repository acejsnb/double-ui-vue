import { VNode, Ref, h, render, isRef } from 'vue';
import { getPlaceByTrigger } from 'js-func-tools';

import DBX, { Item } from './DropBox';

export interface Instance {
	vm: VNode;
	tag: Ref<HTMLElement> | HTMLElement;
	setShow(show: boolean): void;
	resetPosition(): void;
	remove(): void;
}

const resetPosition = (instance: Instance) => {
    const { vm, tag } = instance;
    const { el } = vm;
    const tagEle = isRef(tag) ? tag.value : tag;
    const { left, top, isDown } = getPlaceByTrigger({
        trigger: tagEle,
        dom: el as HTMLElement
    });
    vm.component.exposeProxy.state.position = isDown;
    // 设置位置
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    instance.setShow(true);
};

interface Options {
	tag: HTMLElement;
	[key: string]: any;
}

const DropPanel = (options: Options) => {
    const { tag, propsData } = options;
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    const vm = h(DBX, propsData); // 实例化

    const instance: Instance = {
        vm,
        tag,
        setShow(show: boolean) {
            vm.component.exposeProxy.state.dropBoxStatus = show;
        },
        resetPosition() {
            resetPosition(instance);
        },
        remove() {
            if (vm.component.isUnmounted) return;
            render(null, dom);
            document.body.removeChild(dom);
        }
    };
    render(vm, dom);
    return instance;
};

export default DropPanel;

export type { Item };
