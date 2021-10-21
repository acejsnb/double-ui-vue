import { VNode, Ref, h, render, isRef } from 'vue';
import CalcTargetPosition from '@/utils/CalcTargetPosition';

import DBX, { Item } from './DropBox';

export interface Instance {
	vm: VNode;
	tag: Ref<HTMLElement> | HTMLElement;
	setShow(show: boolean): void;
	resetPosition(): void;
	remove(): void;
}

// 获取宽度
const getWidth = (status: string, data: Item[]) => {
	const { body } = document;
	const tag = document.createElement('div');
	tag.className = 'p-drop-box';
	tag.style.padding = '0';
	tag.style.border = '0';
	tag.style.height = '0';
	tag.style.zIndex = '-100';
	let html = '<div class="p-drop-box-list">';
	data.forEach((d) => {
		html += `<article class="p-drop-box-item"><section class="p-drop-box-text">${d.name}</section></article>`;
	});
	html += '<div>';

	tag.innerHTML = html;
	body.appendChild(tag);
	const { width } = tag.getBoundingClientRect();
	body.removeChild(tag);
	return status.includes('single') ? width : width + 20;
};

const resetPosition = (instance: Instance) => {
	const { vm, tag } = instance;
	const {
		component: {
			props: { data, status }
		},
		el
	} = vm;
	const tagEle = isRef(tag) ? tag.value : tag;
	const width = getWidth(status as string, data as Item[]);
	const height = (status as string).includes('multiple') ? 250 : 208;
	const { X, Y, P } = CalcTargetPosition(tagEle, height, width);
	// @ts-ignore
	vm.type.state.position = P;
	// 设置位置
	el.style.top = `${Y}px`;
	el.style.left = `${X}px`;
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
			// @ts-ignore
			vm.type.state.dropBoxStatus = show;
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
