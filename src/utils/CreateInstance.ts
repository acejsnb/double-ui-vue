/**
 * 创建实例公共方法
 */
import { VNode, Component, createVNode, render } from 'vue';

export interface Instance {
	vm: VNode;
	tag: HTMLElement;
	resetPosition(): void;
	remove(): void;
}

interface Options<T> {
	tag: HTMLElement; // 触发器
	props: T; // 组件props
	component: Component; // 需要挂载的组件
	resetPosition?: (instance: Instance) => void; // 计算位置的方法
}

let dom: HTMLDivElement;
const CreateInstance = <T>(options: Options<T>): Instance => {
    const { tag, props, component, resetPosition } = options;
    if (!dom) {
        dom = document.createElement('div');
        document.body.appendChild(dom);
    }
    const vm = createVNode(component, props as { [key: string]: any });
    const instance = {
        vm,
        tag,
        resetPosition() {
            if (resetPosition) resetPosition(instance);
        },
        remove() {
            if (vm.component.isUnmounted) return;
            render(null, dom);
            // document.body.removeChild(dom);
        }
    };

    render(vm, dom);
    return instance;
};

export default CreateInstance;
