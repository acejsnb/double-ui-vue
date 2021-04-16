import '@/assets/stylus/main';
import { createApp } from 'vue';

import router from './router';

import App from './App';

import Components from './multiple';

// const isProd = process.env.NODE_ENV === 'production';
const app = createApp(App);

app.use(router);
app.use(Components);

app.mount('#meriDesign');
