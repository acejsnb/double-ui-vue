import { defineComponent, reactive } from 'vue';

import Message from '@/components/message';

const MessageView = defineComponent({
    name: 'MessageView',
    setup() {
        const state = reactive({
            info: null,
            success: null
        });

        const messageInfo = () => {
            if (state.info && !state.info.isUnmounted) state.info.changeMessage('aaaaaaaaa');
            else state.info = Message.info('这是一条消息这是', 5);
        };
        const messageSuccess = () => {
            state.success = Message({
                type: 'success', // 可选参数 默认info
                message: 'Oh, yes',
                time: 4 // 可选参数 默认3: 表示3s
            });
        };
        const messageWarning = () => {
            Message.warning('这是一条消息这是', 5);
        };
        const messageError = () => {
            Message.error('这是一条消息这是', 5);
        };

        return () => (
            <div class="component component-padding">
                <button onClick={messageInfo}>info</button>
                <button onClick={messageSuccess}>success</button>
                <button onClick={messageWarning}>warning</button>
                <button onClick={messageError}>error</button>
            </div>
        );
    }
});

export default MessageView;
