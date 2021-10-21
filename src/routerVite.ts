import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import ComponentLists from './pages/ComponentLists';

import BreadcrumbView from './views/example/BreadcrumbView';
import ButtonView from './views/example/ButtonView';
import CheckboxView from './views/example/CheckboxView';
import DrawerView from './views/example/DrawerView';
import DropdownView from './views/example/DropdownView';
import DropTriggerView from './views/example/DropTriggerView';
import MessageView from './views/example/MessageView';
import PopoverTipView from './views/example/PopoverTipView';
import SelectScreenView from './views/example/SelectScreenView';
import SelectView from './views/example/SelectView';
import SidebarCustomView from './views/example/SidebarCustomView';
// import TableView from './views/example/TableView';
import TitleTipView from './views/example/TitleTipView';
// import TreeView from './views/example/TreeView';

const routesJsx: Array<RouteRecordRaw> = [
	{
		path: '/breadcrumbview',
		name: 'BreadcrumbView',
		component: BreadcrumbView,
		meta: {
			title: 'Breadcrumb'
		}
	},
	{
		path: '/buttonview',
		name: 'ButtonView',
		component: ButtonView,
		meta: {
			title: 'Button'
		}
	},
	{
		path: '/checkboxview',
		name: 'CheckboxView',
		component: CheckboxView,
		meta: {
			title: 'Checkbox'
		}
	},
	{
		path: '/drawerview',
		name: 'DrawerView',
		component: DrawerView,
		meta: {
			title: 'Drawer'
		}
	},
	{
		path: '/dropdownview',
		name: 'DropdownView',
		component: DropdownView,
		meta: {
			title: 'Dropdown'
		}
	},
	{
		path: '/droptriggerview',
		name: 'DropTriggerView',
		component: DropTriggerView,
		meta: {
			title: 'DropTrigger'
		}
	},
	{
		path: '/messageview',
		name: 'MessageView',
		component: MessageView,
		meta: {
			title: 'Message'
		}
	},
	{
		path: '/popovertipview',
		name: 'PopoverTipView',
		component: PopoverTipView,
		meta: {
			title: 'PopoverTip'
		}
	},
	{
		path: '/selectscreenview',
		name: 'SelectScreenView',
		component: SelectScreenView,
		meta: {
			title: 'SelectScreen'
		}
	},
	{
		path: '/selectview',
		name: 'SelectView',
		component: SelectView,
		meta: {
			title: 'Select'
		}
	},
	{
		path: '/sidebarcustomview',
		name: 'SidebarCustomView',
		component: SidebarCustomView,
		meta: {
			title: 'SidebarCustom'
		}
	},
	/* {
		path: '/tableview',
		name: 'TableView',
		component: TableView,
		meta: {
			title: 'Table'
		}
	}, */
	{
		path: '/titletipview',
		name: 'TitleTipView',
		component: TitleTipView,
		meta: {
			title: 'TitleTip'
		}
	}
	/* {
		path: '/treeview',
		name: 'TreeView',
		component: TreeView,
		meta: {
			title: 'Tree'
		}
	} */
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/componentLists',
			name: 'double-ui',
			component: ComponentLists,
			meta: {
				title: 'ComponentLists'
			}
		},
		...routesJsx,

		{
			path: '/',
			redirect: '/componentLists'
		}
	]
});

export default router;
