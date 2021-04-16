import { h, isRef, render } from 'vue';

import Drop from './SettingDrop';

const resetPosition = (vm) => {
    const { el, tag } = vm;
    const tagEle = isRef(tag) ? tag.value : tag;
    const { left, top } = tagEle.getBoundingClientRect(),
        { innerHeight, pageXOffset, pageYOffset } = window,
        btm = innerHeight - top - 40, // 设置按钮距离底部高度
        tp = top + 40; // 默认距离顶部位置
    // 设置位置
    let topPlace, // 设置-下拉弹窗距离顶部距离
        position = false; // 弹出方向 - true向上弹窗
    if (btm < 480) {
        if (top >= 480) {
            topPlace = tp - 520;
            position = true;
        } else {
            topPlace = tp - (480 - btm);
        }
    } else {
        topPlace = tp;
    }
    el.style.top = `${topPlace + pageYOffset}px`;
    el.style.left = `${(left - 191) + pageXOffset}px`;
    vm.props.position = position;
    vm.setShow(true);
};

const SettingDrop = (options) => {
    const { tag, propsData } = options,
        dom = document.createElement('div');
    document.body.appendChild(dom);
    const vm = h(Drop, propsData);
    vm.tag = tag;
    vm.setShow = (show) => {
        vm.type.state.settingStatus = show;
    };
    vm.remove = () => {
        if (vm.component.isUnmounted) return;
        render(null, dom);
        document.body.removeChild(dom);
    };
    vm.resetPosition = () => resetPosition(vm);

    render(vm, dom);
    return vm;
};

export default SettingDrop;
