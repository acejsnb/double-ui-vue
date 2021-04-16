import { h, render } from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import DB from './DropBox';

const resetPosition = vm => {
    const {
        props: {
            data = [],
            width,
            alignRight = false
        },
        el,
        tag
    } = vm;

    const hei = data.length * 38 + 16;
    let height;
    if (hei < 208) height = hei;
    else height = 208;
    const { X, Y, P } = CalcTargetPosition(tag, height, width, alignRight);
    vm.setPosition(P);
    // 设置位置
    el.style.top = `${Y}px`;
    el.style.left = `${X}px`;
    vm.setShow(true);
};

const DropBox = (options) => {
    const { tag, propsData } = options;
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    const vm = h(DB, propsData);

    vm.tag = tag;
    vm.setPosition = (position) => {
        vm.type.state.position = position;
    };
    vm.setShow = (show) => {
        vm.type.state.dropShow = show;
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

export default DropBox;
