import { h, nextTick, render, VNode } from 'vue';

import Msg from './Message';

let msgBox: HTMLDivElement;

type TOption = {
	message: string;
	time?: number;
	type?: string;
};
const Message = (options: TOption, time = 3) => {
    const opt: TOption = options;
    let timer: number = null;
    opt.time = time;
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.className = 'd-message-box';
        document.body.appendChild(msgBox);
    }
    const dom = document.createElement('span');
    dom.style.marginBottom = '24px';
    msgBox.appendChild(dom);
    const vm: VNode = h(Msg, opt);
    const instance = {
        isUnmounted: false,
        vm,
        remove() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            if (vm.component.isUnmounted) return;
            instance.setShow(false);
            instance.isUnmounted = true; // 设置销毁标记
            setTimeout(() => {
                render(null, dom);
                msgBox.removeChild(dom);
            }, 300);
        },
        setShow(show: boolean) {
            vm.component.props.show = show;
        },
        // 改变消息
        changeMessage(msg: string) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            vm.component.props.message = msg;
            timer = window.setTimeout(() => {
                instance.remove();
            }, opt.time * 1000);
        }
    };
    nextTick(() => {
        vm.component.props.removeMessage = instance.remove;
        instance.setShow(true);
        timer = window.setTimeout(() => {
            instance.remove();
        }, opt.time * 1000);
    });
    render(vm, dom);
    return instance;
};

const SetMessage = (type: string) => (message: string, time = 3) => Message({ message, time, type });

Message.info = SetMessage('info');
Message.success = SetMessage('success');
Message.warning = SetMessage('warning');
Message.error = SetMessage('error');

export default Message;
