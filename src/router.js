import { createRouter, createWebHashHistory } from 'vue-router';

import ComponentLists from './pages/ComponentLists';

// const demoVue = require.context('./views/demoVue', false, /\.vue$/);
// const demoVue = require.context('./views/test', false, /\.vue$/);
const demoJsx = require.context('./views/demoJsx', false, /\.jsx$/);

/*
const routesVue = demoVue.keys().map(d => {
    const item = d.replace(/\.|\/|(vue)/g, '');
    const com = demoVue(d);
    return {
        path: `/${item.toLowerCase()}`,
        name: item,
        component: com.default || com,
        meta: {
            title: item
        }
    };
});
*/

const routesJsx = demoJsx.keys().map(d => {
    const item = d.replace(/\.|\/|(jsx)/g, '');
    const com = demoJsx(d);
    return {
        path: `/${item.toLowerCase()}`,
        name: item,
        component: com.default || com,
        meta: {
            title: item
        }
    };
});

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/componentLists',
            name: 'Meri design',
            component: ComponentLists,
            meta: {
                title: 'ComponentLists'
            }
        },
        // ...routesVue,
        ...routesJsx,

        {
            path: '/',
            redirect: '/componentLists'
        }
    ]
});

export default router;
