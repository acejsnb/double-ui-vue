import './style.styl';
import {
	PropType,
	defineComponent,
	ref,
	reactive,
	computed,
	inject,
	watch,
	onBeforeUnmount
} from 'vue';

import FilterSvg from '@/assets/iconSvg/filter.svg';
import TriangleSvg from '@/assets/iconSvg/triangle.svg';

import PopoverTip from '@/components/popoverTip/PopoverTip';
import DropPanel, { Item, Instance } from './depend/dropPanel';

export interface IState {
	dropBoxStatus: boolean;
	dropData: Item[];
	singleName: string;
	choiceId: string;
	selectedData: Item[] | Item;
}

const SelectScreen = defineComponent({
	name: 'SelectScreen',
	props: {
		// 筛选4种状态 【'single', 'multiple', 'singleSearch', 'multipleSearch'】
		status: {
			type: String,
			default: 'single'
		},
		data: {
			type: Array as PropType<Item[]>,
			default: (): Item[] => []
		},
		// 选中的id
		selectedId: {
			type: String,
			default: ''
		},
		// 选中的name
		selectName: {
			type: String,
			default: ''
		},
		// screen triangle
		icon: {
			type: String,
			default: 'screen'
		},
		placeholder: {
			type: String,
			default: '请输入'
		},
		onChange: {
			type: Function,
			default: () => {}
		}
	},
	setup(props, { emit }) {
		const state = reactive<IState>({
			dropBoxStatus: false, // 下拉列表展开状态
			dropData: [], // 数据列表
			singleName: '全部',
			choiceId: '', // 选中的id
			selectedData: [] // 多选——选中的数据
		});

		const selectScreen = ref(null);
		const refTrigger = ref(null);

		const tableLayoutMain = inject('tableLayoutMain');

		// 选中的name
		const selectedName = computed(() => {
			const { status } = props;
			const { singleName, selectedData } = state;
			if (status.includes('single')) return singleName;
			const selectedNameArr: string[] = [];
			selectedData.forEach((d: Item) => {
				selectedNameArr.push(d.name);
			});
			return selectedNameArr.toString().replace(/,/g, '、');
		});

		const activeSvg = computed(() => {
			const { data, status, selectedId, icon } = props;
			const { selectedData } = state;
			if (icon === 'triangle') return;
			if (status.includes('single')) return selectedId && selectedId !== data[0]?.id;
			if (status.includes('multiple')) return selectedData.length > 0;
			return false;
		});

		// 初始化设置数据
		const setInit = (id = '', data: Item[]) => {
			const { status } = props;
			state.choiceId = id;
			if (status.includes('single')) {
				const { name = '' } = data.find((d) => d.id === id) || {};
				state.singleName = name;
			} else {
				state.selectedData = data.filter((d) => {
					if (d.checked === 'checked') return d;
					return null;
				});
			}
			state.dropData = data;
		};
		setInit(props.selectedId, JSON.parse(JSON.stringify(props.data)));

		watch(
			() => props.data,
			(n) => {
				setInit(props.selectedId, JSON.parse(JSON.stringify(n)));
			},
			{ deep: true }
		);
		// 监听选中的id改变
		watch(
			() => props.selectedId,
			(n, o) => {
				if (n === o || n === state.choiceId) return;
				setInit(n, JSON.parse(JSON.stringify(props.data)));
			}
		);

		let dropPanel: Instance;
		let parentScroll: HTMLElement;
		// 设置下拉状态
		const setDropdownStatus = (status: boolean) => {
			state.dropBoxStatus = status;
			if (dropPanel) {
				// @ts-ignore
				dropPanel.vm.type.state.dropBoxStatus = status;
				if (status) dropPanel.resetPosition();
			}
		};
		// 监听滚动条滚动
		const listenScroll = () => {
			if (state.dropBoxStatus) setDropdownStatus(false);
		};
		const dropChange = (id: string, selectedData: Item[] | Item) => {
			const { status, icon } = props;
			state.choiceId = id;
			if (dropPanel) dropPanel.vm.component.props.selectedId = id;
			if (status.includes('single')) state.singleName = (selectedData as Item).name;
			else state.selectedData = selectedData;
			emit('change', icon, id, selectedData);
		};
		// 展开下拉列表
		const openDropBox = () => {
			const { dropBoxStatus } = state;
			if (dropBoxStatus) {
				setDropdownStatus(false);
				return;
			}
			if (dropPanel) {
				setDropdownStatus(true);
			} else {
				const { status, selectedId, icon, placeholder } = props;
				const { dropData: data } = state;
				dropPanel = DropPanel({
					tag: selectScreen,
					propsData: {
						status,
						data,
						selectedId,
						icon,
						placeholder,
						change(id: string, selectedData: Item[]) {
							dropChange(id, selectedData);
							setDropdownStatus(false);
						},
						cancel(dropdownStatus: boolean) {
							setDropdownStatus(dropdownStatus);
						}
					}
				});

				setDropdownStatus(true);

				// 监听滚动条滚动
				// @ts-ignore
				parentScroll = tableLayoutMain?.$refs?.tableLayoutMain;
				if (parentScroll) parentScroll.addEventListener('scroll', listenScroll, false);
				window.addEventListener('scroll', listenScroll, false);
			}
		};

		onBeforeUnmount(() => {
			setDropdownStatus(false);
			dropPanel.remove();
			if (parentScroll) parentScroll.removeEventListener('scroll', listenScroll);
			window.removeEventListener('scroll', listenScroll);
		});

		return () => {
			const { icon } = props;
			const { dropBoxStatus } = state;
			return (
				<div
					class={['p-select-screen', dropBoxStatus && 'p-select-screen-none']}
					onClick={(e) => {
						e.stopPropagation();
						openDropBox();
					}}
					ref={selectScreen}
				>
					<PopoverTip
						tag={refTrigger}
						countTag={refTrigger}
						content={selectedName}
						dropShow={dropBoxStatus}
					>
						<i
							class={[
								'p-select-screen-svg',
								icon === 'triangle' && !dropBoxStatus && 'p-select-triangle-open',
								activeSvg.value && 'p-select-screen-svg-active'
							]}
							ref={refTrigger}
						>
							{icon === 'triangle' ? <TriangleSvg /> : <FilterSvg />}
						</i>
					</PopoverTip>
					{dropBoxStatus && (
						<div
							class="p-select-screen-shade"
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
					)}
				</div>
			);
		};
	}
});

export default SelectScreen;
