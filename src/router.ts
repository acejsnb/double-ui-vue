import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import ComponentLists from './pages/ComponentLists';

const example = require.context('./views/example', false, /\.tsx$/);

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

const routes: Array<RouteRecordRaw> = example.keys().map((d: string) => {
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

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/componentLists',
			name: 'DoubleUi',
			component: ComponentLists,
			meta: {
				title: 'ComponentLists'
			}
		},
		...routes,

		{
			path: '/',
			redirect: '/componentLists'
		}
	]
});

export default router;
