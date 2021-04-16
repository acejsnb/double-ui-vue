import { h, nextTick, render } from 'vue';

import Msg from './Message';

let msgBox = null;

const Message = (options, time = 3) => {
    let opt = options || {},
        timer = null;
    if (typeof opt === 'string') { // 如果只传入字符串，将其设置为显示的信息
        opt = {
            message: options,
            time
        };
    }
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.className = 'p-message-box';
        document.body.appendChild(msgBox);
    }
    const dom = document.createElement('span');
    dom.style.marginBottom = '24px';
    msgBox.appendChild(dom);
    const vm = h(Msg, opt);
    vm.remove = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (vm.component.isUnmounted) return;
        vm.setShow(false);
        vm.isUnmounted = true; // 设置销毁标记
        setTimeout(() => {
            render(null, dom);
            msgBox.removeChild(dom);
        }, 300);
    };
    vm.setShow = (show) => {
        vm.component.props.show = show;
    };
    // 改变消息
    vm.changeMessage = (msg) => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        vm.component.props.message = msg;
        timer = setTimeout(() => {
            vm.remove();
        }, opt.time * 1000);
    };
    nextTick(() => {
        vm.component.props.removeMessage = vm.remove;
        vm.setShow(true);
        timer = setTimeout(() => {
            vm.remove();
        }, opt.time * 1000);
    });
    render(vm, dom);
    return vm;
};

['info', 'success', 'warning', 'error'].forEach(type => {
    Message[type] = (options, time = 3) => {
        let opt = options || {};
        if (typeof opt === 'string') {
            opt = {
                message: opt,
                time
            };
        }
        opt.type = type;
        return Message(opt);
    };
});

export default Message;
