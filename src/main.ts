import './assets/stylus/variables.styl';
import './assets/stylus/base.styl';
import { createApp } from 'vue';

import router from './router';
import App from './App';
// import Components from './full';

const app = createApp(App);

// app.use(router).use(Components).mount('#doubleUi');
app.use(router).mount('#doubleUi');
