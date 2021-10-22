import SortByParams, { IComponents } from '../utils/SortByParams';

const components = [
	// {
	//     title: 'Avatar',
	//     more: '头像',
	//     url: 'avatarview'
	// },
	// {
	//     title: 'Badge',
	//     more: '徽标',
	//     url: 'badgeview'
	// },
	{
		title: 'Breadcrumb',
		more: '面包屑',
		url: 'breadcrumbview'
	},
	{
		title: 'Button',
		more: '按钮',
		url: 'buttonview'
	},
	// {
	//     title: 'Cascader',
	//     more: '级联选择',
	//     url: 'cascaderview'
	// },
	// {
	//     title: 'CascaderSearchList',
	//     more: '级联选择-带搜索列表',
	//     url: 'cascadersearchlistview'
	// },
	{
		title: 'Checkbox',
		more: '复选框',
		url: 'checkboxview'
	},
	// {
	//     title: 'CheckboxGroup',
	//     more: '组合多选框-CheckboxGroupView',
	//     url: 'checkboxgroupview'
	// },
	// {
	//     title: 'CustomTreeSelectEnergy',
	//     more: '运行能耗诊断弹窗选择器',
	//     url: 'customtreeselectenergyview'
	// },
	// {
	//     title: 'Divider',
	//     more: '分割线',
	//     url: 'dividerview'
	// },
	{
		title: 'Drawer',
		more: '抽屉',
		url: 'drawerview'
	},
	{
		title: 'Dropdown',
		more: '下拉菜单',
		url: 'dropdownview'
	},
	{
		title: 'Form',
		more: '表单',
		url: 'formview'
	},
	{
		title: 'DropTrigger',
		more: '触发器使用方式',
		url: 'droptriggerview'
	},
	// {
	//     title: 'DropDownButton',
	//     more: '下拉按钮',
	//     url: 'dropdownbuttonview'
	// },
	// {
	//     title: 'DropGroup',
	//     more: '下拉菜单组',
	//     url: 'dropgroupview'
	// },
	// {
	//     title: 'Editable',
	//     more: '动态项',
	//     url: 'editableview'
	// },
	// {
	//     title: 'EditableList',
	//     more: '动态列表',
	//     url: 'editablelistview'
	// },
	// {
	//     title: 'EmptyStatus',
	//     more: '空状态',
	//     url: 'emptystatusview'
	// },
	// {
	//     title: 'FileUpload',
	//     more: '文件上传',
	//     url: 'fileuploadview'
	// },
	// {
	//     title: 'Headers',
	//     more: '头部title',
	//     url: 'headersview'
	// },
	// {
	//     title: 'Icon',
	//     more: '图标',
	//     url: 'iconview'
	// },
	// {
	//     title: 'ImageUpload',
	//     more: '图片上传',
	//     url: 'imageuploadview'
	// },
	// {
	//     title: 'IndexLoading',
	//     more: '首页加载动画',
	//     url: 'indexloadingview'
	// },
	// {
	//     title: 'Input',
	//     more: '输入框',
	//     url: 'inputview'
	// },
	// {
	//     title: 'InputNumber',
	//     more: '输入框',
	//     url: 'inputnumberview'
	// },
	// {
	//     title: 'Loading',
	//     more: '加载动画',
	//     url: 'loadingview'
	// },
	{
		title: 'Message',
		more: '信息提示',
		url: 'messageview'
	},
	// {
	//     title: 'Modal',
	//     more: '弹窗',
	//     url: 'modalview'
	// },
	// {
	//     title: 'MultipleSearchInput',
	//     more: '多维度选择器',
	//     url: 'multiplesearchinputview'
	// },
	// {
	//     title: 'Pagination',
	//     more: '分页-pagination',
	//     url: 'paginationview'
	// },
	// {
	//     title: 'PickerDate',
	//     more: '日期选择器-第二版',
	//     url: 'pickerdateview'
	// },
	// {
	//     title: 'PickerMonth',
	//     more: '月选择器',
	//     url: 'pickermonthview'
	// },
	// {
	//     title: 'PickerMonthDay',
	//     more: '月日选择器',
	//     url: 'pickermonthdayview'
	// },
	// {
	//     title: 'PickerTime',
	//     more: '时分秒选择',
	//     url: 'pickertimeview'
	// },
	// {
	//     title: 'Popover',
	//     more: '气泡框',
	//     url: 'popoverview'
	// },
	{
		title: 'PopoverTip',
		more: '触发器PopoverTip',
		url: 'popovertipview'
	},
	{
		title: 'Tree',
		more: '树形结构-可自定义渲染列表',
		url: 'treeview'
	},
	// {
	//     title: 'PTreeSelectView',
	//     more: '树形下拉选择-可自定义渲染列表',
	//     url: 'ptreeselectview'
	// },
	// {
	//     title: 'Radio',
	//     more: '单选框',
	//     url: 'radioview'
	// },
	// {
	//     title: 'RadioGroup',
	//     more: '组合单选框-RadioGroupView',
	//     url: 'radiogroupview'
	// },
	{
		title: 'Select',
		more: '下拉列表',
		url: 'selectview'
	},
	{
		title: 'SelectScreen',
		more: '下拉筛选',
		url: 'selectscreenview'
	},
	// {
	//     title: 'TableGrid',
	//     more: '表格第二代',
	//     url: 'tablegridview'
	// },
	// {
	//     title: 'THead',
	//     more: '表头',
	//     url: 'theadview'
	// },
	// {
	//     title: 'TableTree',
	//     more: '树形表格',
	//     url: 'tabletreeview'
	// },
	// {
	//     title: 'Tabs',
	//     more: '标签页',
	//     url: 'tabsview'
	// },
	// {
	//     title: 'Tag',
	//     more: '标签',
	//     url: 'tagview'
	// },
	// {
	//     title: 'Toggle',
	//     more: '开关',
	//     url: 'toggleview'
	// },
	{
		title: 'TitleTip',
		more: '省略内容提示',
		url: 'titletipview'
	},
	// {
	//     title: 'TopNotification',
	//     more: '置顶条',
	//     url: 'topnotificationview'
	// },
	// {
	//     title: 'Transfer',
	//     more: '穿梭框',
	//     url: 'transferview'
	// },
	// {
	//     title: 'TransferEquipment',
	//     more: '设备设施穿梭框-不联动',
	//     url: 'transferequipmentview'
	// },
	// {
	//     title: 'TransferSelectModal',
	//     more: '穿梭框-selectModal',
	//     url: 'transferselectmodalview'
	// },
	// {
	//     title: 'Tree',
	//     more: '树形结构',
	//     url: 'treeview'
	// },
	// {
	//     title: 'TreeBi',
	//     more: '树形结构-BI',
	//     url: 'treebiview'
	// },
	// {
	//     title: 'TreePersonOrg',
	//     more: '树形结构业务组件',
	//     url: 'treepersonorgview'
	// },
	// {
	//     title: 'TreeSelect',
	//     more: '树选择',
	//     url: 'treeselectview'
	// },
	// {
	//     title: 'CarouselText',
	//     more: '文字轮播',
	//     url: 'carouseltextview'
	// },
	// {
	//     title: 'TreeStage',
	//     more: '树形结构-2种特殊情况',
	//     url: 'treestageview'
	// },
	// {
	//     title: 'Shake',
	//     more: '抖动',
	//     url: 'shakeview'
	// },
	{
		title: 'SidebarCustom',
		more: '自定义侧边栏',
		url: 'sidebarcustomview'
	},
	{
		title: 'Table',
		more: '表格',
		url: 'tableview'
	}
	// {
	//     title: 'TransferMini',
	//     more: '穿梭框-TransferMini',
	//     url: 'transferminiview'
	// },
	// {
	//     title: 'ViewTableView',
	//     more: '展示类表格',
	//     url: 'viewtableview'
	// },
	// {
	//     title: 'FrameMenuView',
	//     more: '展示类表格',
	//     url: 'framemenuview'
	// }
];

export default SortByParams(components, 'title');

export type { IComponents };
