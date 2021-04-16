import { createRouter, createWebHashHistory } from 'vue-router';

import ComponentLists from './pages/ComponentLists';

import BreadcrumbView from './views/demoJsx/BreadcrumbView';
import ButtonView from './views/demoJsx/ButtonView';
import CheckboxView from './views/demoJsx/CheckboxView';
import DrawerView from './views/demoJsx/DrawerView';
import DropdownView from './views/demoJsx/DropdownView';
import DropTriggerView from './views/demoJsx/DropTriggerView';
import MessageView from './views/demoJsx/MessageView';
import PopoverTipView from './views/demoJsx/PopoverTipView';
import SelectScreenView from './views/demoJsx/SelectScreenView';
import SelectView from './views/demoJsx/SelectView';
import SidebarCustomView from './views/demoJsx/SidebarCustomView';
import TableView from './views/demoJsx/TableView';
import TitleTipView from './views/demoJsx/TitleTipView';
import TreeView from './views/demoJsx/TreeView';

const routesJsx = [
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
    {
        path: '/tableview',
        name: 'TableView',
        component: TableView,
        meta: {
            title: 'Table'
        }
    },
    {
        path: '/titletipview',
        name: 'TitleTipView',
        component: TitleTipView,
        meta: {
            title: 'TitleTip'
        }
    },
    {
        path: '/treeview',
        name: 'TreeView',
        component: TreeView,
        meta: {
            title: 'Tree'
        }
    }
];

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
        ...routesJsx,

        {
            path: '/',
            redirect: '/componentLists'
        }
    ]
});

export default router;
