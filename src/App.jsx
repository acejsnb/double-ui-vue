import './assets/stylus/app.styl';

import { defineComponent, ref, onMounted } from 'vue';
import { RouterView } from 'vue-router';

const App = defineComponent({
    name: 'App',
    setup() {
        const routeName = ref(''); // 当前路由名字
        /* window.addEventListener('message', ({ data }) => {
            if (data && typeof data === 'string') {
                const { message } = JSON.parse(data);
                console.log('子系统===', message);

                setTimeout(() => {
                    // window.parent.postMessage(JSON.stringify({ message: { msg: '子页面消息收到' } }), message.url);
                    window.parent.postMessage(JSON.stringify({ message: { fullScreen: true } }), message.url);
                    setTimeout(() => {
                        window.parent.postMessage(JSON.stringify({ message: { fullScreen: false } }), message.url);
                    }, 1000);
                }, 1000);
            }
        }); */
        onMounted(() => {

        });

        return () => (
            <div class="app">
                <div class="backBox">
                    <section class="title">{{ routeName }}</section>
                </div>
                <div class="app-main">
                    <div class="app-hidden"/>
                    <div class="app-content" id="appContent">
                        <RouterView/>
                    </div>
                </div>
            </div>
        );
    }
});

export default App;
