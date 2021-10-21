import './assets/stylus/variables.styl';
import './assets/stylus/base.styl';
import { createApp } from 'vue';

import router from './routerVite';
import App from './App';

const app = createApp(App);

app.use(router).mount('#doubleUi');
