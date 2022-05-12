import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import ComponentLists from './pages/ComponentLists';

const modules = import.meta.glob('./views/example/**.tsx');
const routesJsx: Array<RouteRecordRaw> = Object.keys(modules)?.map((key) => {
    const k = key.split('/').at(-1).replace('.tsx', '');
    return {
        path: `/${k.toLowerCase()}`,
        name: k,
        component: modules[key],
        meta: { title: k.replace('View', '') }
    };
});
const modulesVue = import.meta.glob('./views/template/**.vue');
const routesVue: Array<RouteRecordRaw> = Object.keys(modulesVue)?.map((key) => {
    const k = key.split('/').at(-1).replace('.vue', '');
    return {
        path: `/${k.toLowerCase()}`,
        name: k,
        component: modulesVue[key],
        meta: { title: k.replace('View', '') }
    };
});

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'double-ui-vue',
            component: ComponentLists,
            meta: {
                title: 'ComponentLists'
            }
        },
        ...routesJsx,
        ...routesVue

        /* {
			path: '/',
			redirect: '/componentLists'
		} */
    ]
});

export default router;
