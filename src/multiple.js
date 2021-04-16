/**
 * 所有组件打包
 */

import './components/base';
import Breadcrumb from './components/breadcrumb/Breadcrumb';
import Button from './components/button/Button';
import Checkbox from './components/checkbox/Checkbox';
import Drawer from './components/drawer/Drawer';
import Dropdown from './components/dropdown/Dropdown';
import Message from './components/message';
import PopoverTip from './components/popoverTip/PopoverTip';
import Select from './components/select/Select';
import SelectScreen from './components/selectScreen/SelectScreen';
import SidebarCustom from './components/sidebarCustom/sidebarCustom';
import Table from './components/table/Table';
import TitleTip from './components/titleTip';
import Tree from './components/tree/Tree';

const Components = {
    Breadcrumb,
    Button,
    Checkbox,
    Drawer,
    Dropdown,
    PopoverTip,
    Select,
    SelectScreen,
    SidebarCustom,
    Table,
    TitleTip,
    Tree
};

const install = app => Object.keys(Components).forEach(name => {
    if (name === 'Message') app.config.globalProperties.$message = Message;
    else if (name === 'TitleTip') app.directive('title', { mounted: TitleTip, beforeUnmount: TitleTip.remove });
    else app.component(name, Components[name]);
});

Components.install = install;

export default Components;
