import { createVNode, render } from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';

import D from './DOption';

// 获取宽度
const GetWidth = (data, minWidth, maxWidth) => {
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

const resetPosition = vm => {
    const {
        component: {
            props: {
                data = [],
                minWidth,
                maxWidth,
                alignRight,
                translateX,
                maxCount = 5
            },
            refs: { dropOption }
        },
        el,
        tag
    } = vm;
    const width = (minWidth && maxWidth && minWidth === maxWidth) ? maxWidth : GetWidth(data, minWidth, maxWidth);

    // const baseHei = 16 + (openSearch && 40), // 基本高度
    const h = data.length * 38,
        maxHeiByCount = maxCount * 38; // 最大容纳高度
    let height;
    if (h < maxHeiByCount) height = h;
    else height = maxHeiByCount;
    const { X, Y, P } = CalcTargetPosition(tag, height, width, alignRight);
    vm.component.props.position = P;
    // 设置位置
    el.style.top = `${Y}px`;
    el.style.left = `${X + Number(translateX)}px`;
    dropOption.style.maxHeight = `${maxHeiByCount}px`;
};

const DropOption = (options) => {
    const { tag, propsData } = options;
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    const vm = createVNode(D, propsData);

    vm.tag = tag;
    vm.resetPosition = () => resetPosition(vm);
    vm.remove = () => {
        if (vm.component.isUnmounted) return;
        render(null, dom);
        document.body.removeChild(dom);
    };
    render(vm, dom);
    return vm;
};

export default DropOption;
