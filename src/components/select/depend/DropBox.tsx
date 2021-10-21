import {
	PropType,
	defineComponent,
	reactive,
	computed,
	watch,
	getCurrentInstance,
	onMounted,
	onBeforeUnmount,
	Transition,
	createStaticVNode
} from 'vue';
import ClickOutside from '@/utils/ClickOutside';
import TextEllipsis from '@/utils/TextEllipsis';
import RegHtml from '@/utils/RegTools';
import SelectCheckbox from '@/components/selectCheckbox/SelectCheckbox';
import { Item } from '../types';

export interface IDBState {
	confirmDisable: boolean;
	selectedData: Item[] | Item;
	selectedDataHistory: Item[] | Item;
	dropData: Item[];
}

const DropBox = defineComponent({
	name: 'DropBox',
	props: {
		parentState: {
			type: Object,
			default: () => ({})
		},
		width: {
			type: [String, Number],
			default: ''
		},
		// 动画执行方向
		position: {
			type: Boolean,
			default: true
		},
		// 默认为true 居左对齐
		alignRight: {
			type: Boolean,
			default: true
		},
		// 单选还是多选
		multiple: {
			type: Boolean,
			default: false
		},
		// 选中的id
		selectedId: {
			type: [String, Array]
		},
		data: {
			type: Array as PropType<Item[] | []>,
			default: (): Item[] => []
		},
		// 容纳最大数量
		maxCount: {
			type: [String, Number],
			default: 5
		},
		// change事件
		change: {
			type: Function,
			default: () => {}
		},
		// 取消事件
		cancel: {
			type: Function,
			default: () => {}
		}
	},
	setup(props) {
		const state = reactive<IDBState>({
			confirmDisable: true, // 确定按钮禁用
			selectedData: [], // 选中的数据
			selectedDataHistory: [], // 选中的历史数据
			dropData: []
		});
		DropBox.state = state;
		const { proxy }: any = getCurrentInstance();

		watch(
			() => props.parentState.dropShow,
			(n, o) => {
				if (n === o) return;
				const { confirmDisable, selectedDataHistory } = state;
				if (n || confirmDisable) return;
				setTimeout(() => {
					state.selectedData = JSON.parse(JSON.stringify(selectedDataHistory));
					/* state[props.multiple ? 'selectedData' : 'selectedItem'] = JSON.parse(
						JSON.stringify(selectedDataHistory)
					); */
					state.confirmDisable = true;
					const ids = selectedDataHistory.map((d: Item) => d.id);
					state.dropData = props.data.map((d: Item) => {
						if (ids.includes(d.id)) d.checked = 'checked';
						else d.checked = 'uncheck';
						return d;
					});
				}, 300);
			}
		);
		watch(
			() => props.data,
			(n) => {
				state.dropData = JSON.parse(JSON.stringify(n));
			},
			{ deep: true, immediate: true }
		);

		const hasDropData = computed<number>(() => state.dropData?.length);

		// 关闭弹窗
		const closeDrop = () => {
			const { parentState } = props;
			parentState.dropShow = false;
		};
		const clickOutSide = (e: MouseEvent) => {
			ClickOutside(e, proxy.$el, closeDrop);
		};

		onMounted(() => {
			const { multiple, data, selectedId = [] } = props;
			const selectedData = multiple
				? data.filter((d) => selectedId.includes(d.id))
				: data.find((d) => d.id === selectedId);
			if (selectedData) {
				state.selectedData = selectedData;
				state.selectedDataHistory = JSON.parse(JSON.stringify(selectedData));
			}

			// 注册关闭事件
			window.addEventListener('click', clickOutSide, true);
			window.addEventListener('blur', closeDrop, true);
		});
		onBeforeUnmount(() => {
			window.removeEventListener('click', clickOutSide);
			window.removeEventListener('blur', closeDrop);
		});

		// 点击列表
		const optionHandle = (item: Item) => {
			if (item.disabled) return;
			const obj = JSON.parse(JSON.stringify(item));
			obj.name = obj.name.replace(RegHtml, '');
			props.change(obj);
		};
		// 多选change回调
		const change = (selected: Item, unselect: Item) => {
			const { selectedData, selectedDataHistory } = state;
			let sd: Item[] | Item;
			if (JSON.stringify(selected).length > 4) {
				(selectedData as Item[]).push(selected);
				sd = selectedData;
			} else {
				sd = (selectedData as Item[]).filter((d) => d.id !== unselect.id);
			}
			state.selectedData = sd;
			const cur = sd
				.map((d: Item) => d.id)
				.sort()
				.join('');
			const his = selectedDataHistory
				.map((d: Item) => d.id)
				.sort()
				.join('');
			state.confirmDisable = cur || his ? cur === his : !cur || !his;
		};
		// 取消
		const cancel = () => {
			props.cancel();
		};
		// 确定
		const confirm = () => {
			const { confirmDisable, selectedData } = state;
			if (confirmDisable) return;
			state.selectedDataHistory = JSON.parse(JSON.stringify(selectedData));
			state.confirmDisable = true;
			props.change(selectedData);
		};

		return () => {
			const {
				width,
				position,
				maxCount,
				multiple,
				selectedId,
				parentState: { dropShow }
			} = props;
			const { confirmDisable, dropData } = state;

			return (
				<Transition name={position ? 'selectDownUpExtend' : 'selectDownUpExtendTop'}>
					<div
						v-show={dropShow}
						class={['m-drop-box', `m-drop-box-shadow-${position ? 'bottom' : 'top'}`]}
						style={{ width: `${width}px` }}
					>
						<div
							class={[
								'm-drop-box-content',
								`m-drop-box-content-${maxCount <= 5 ? 'normal' : 'max'}`
							]}
						>
							{hasDropData?.value ? (
								multiple ? (
									<SelectCheckbox
										textIndent={false}
										data={dropData}
										stopPropagation={true}
										onChange={change}
									/>
								) : (
									dropData.map((d, i) => (
										<div
											key={`${d.id}-${i}`}
											class={[
												'm-drop-option',
												d.id === selectedId && 'm-drop-option-selected',
												d.disabled
													? 'm-drop-option-disabled'
													: 'm-drop-option-normal'
											]}
											onClick={() => optionHandle(d)}
										>
											<section
												class="m-drop-option-text"
												onMouseenter={TextEllipsis}
											>
												{createStaticVNode(d.name, 0)}
											</section>
										</div>
									))
								)
							) : (
								<div class="m-drop-option-none">没有找到任何内容</div>
							)}
						</div>
						{multiple && (
							<div
								class={[
									'm-drop-handle',
									dropData.length > maxCount && 'm-drop-handle-shadow'
								]}
							>
								<span class="m-drop-btn m-drop-btn-cancel" onClick={cancel}>
									取消
								</span>
								<span
									class={[
										'm-drop-btn',
										confirmDisable
											? 'm-drop-btn-disabled'
											: 'm-drop-btn-confirm'
									]}
									onClick={confirm}
								>
									确定
								</span>
							</div>
						)}
					</div>
				</Transition>
			);
		};
	}
});

export default DropBox;
