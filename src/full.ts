/**
 * 所有组件打包
 */
import { App, Component } from 'vue';

import Breadcrumb from './components/breadcrumb';
import Button from './components/button';
import Checkbox from './components/checkbox';
import Drawer from './components/drawer';
import Dropdown from './components/dropdown';
import Form from './components/form';
import Input from './components/input';
import Message from './components/message';
import PopoverTip from './components/popoverTip';
import Select from './components/select';
import SelectScreen from './components/selectScreen';
import SidebarCustom from './components/sidebarCustom';
// import Table from './components/table/Table';
import TitleTip from './components/titleTip';
// import Tree from './components/tree/Tree';

const components: Component = {
    Breadcrumb,
    Button,
    Checkbox,
    Drawer,
    Dropdown,
    Form,
    Input,
    PopoverTip,
    Select,
    SelectScreen,
    SidebarCustom,
    // Table,
    TitleTip
    // Tree
};

const install = (app: App): void => {
    Object.keys(components).forEach((name: string) => {
        if (name === 'Message') app.config.globalProperties.$message = Message;
        else if (name === 'TitleTip')
            app.directive('title', { mounted: TitleTip, beforeUnmount: TitleTip.remove });
        else app.component(name, components[name]);
    });
};

components.install = install;
export default components;
