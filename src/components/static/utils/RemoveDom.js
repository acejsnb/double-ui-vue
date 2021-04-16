// 移除dom
const RemoveDom = (vm) => {
    if (!vm) return;
    vm.unmount(vm.dom);
    document.body.removeChild(vm.dom);
};

export default RemoveDom;
