import { h, render, isRef } from 'vue';
import CalcTargetPosition from '../../static/utils/CalcTargetPosition';

import DBX from './DropBox';

// 获取宽度
const getWidth = (status, data) => {
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
    return status.includes('single') ? width : (width + 20);
};

const resetPosition = (vm) => {
    const {
        component: {
            props: {
                data = [],
                status
            }
        },
        el,
        tag
    } = vm;
    const tagEle = isRef(tag) ? tag.value : tag;
    const width = getWidth(status, data),
        height = status.includes('multiple') ? 250 : 208;
    const { X, Y, P } = CalcTargetPosition(tagEle, height, width);
    vm.type.state.position = P;
    // 设置位置
    el.style.top = `${Y}px`;
    el.style.left = `${X}px`;
    vm.setShow(true);
};

const DropPanel = (options) => {
    const { tag, propsData } = options;
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    const vm = h(DBX, propsData); // 实例化

    vm.tag = tag;
    vm.setShow = (show) => {
        vm.type.state.dropBoxStatus = show;
    };
    vm.resetPosition = () => resetPosition(vm);
    vm.remove = () => {
        if (vm.component.isUnmounted) return;
        render(null, dom);
        document.body.removeChild(dom);
    };
    render(vm, dom);
    return vm;
};

export default DropPanel;
