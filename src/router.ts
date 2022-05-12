import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import ComponentLists from './pages/ComponentLists';

const example = require.context('./views/example', false, /\.tsx$/);
const routesJsx: Array<RouteRecordRaw> = example.keys().map((d: string) => {
    const item = d.replace(/\.|\/|(tsx)/g, '');
    const com = example(d);
    return {
        path: `/${item.toLowerCase()}`,
        name: item,
        component: com.default || com,
        meta: {
            title: item
        }
    };
});

const exampleVue = require.context('./views/template', false, /\.vue$/);
const routesVue = exampleVue.keys().map((d) => {
    const item = d.replace(/\.|\/|(vue)/g, '');
    const com = exampleVue(d);
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
