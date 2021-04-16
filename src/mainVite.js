import '@/assets/stylus/variables';
import '@/assets/stylus/main';
import { createApp } from 'vue';

import router from './routerVite';

import App from './App';

import Components from './multiple';

const app = createApp(App);

app.use(router);
app.use(Components);

app.mount('#meriDesign');
