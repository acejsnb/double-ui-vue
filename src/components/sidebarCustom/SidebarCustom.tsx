import './style.styl';

import {
	defineComponent,
	reactive,
	watch,
	onMounted,
	onBeforeUnmount,
	getCurrentInstance
} from 'vue';
import ArrowDoubleLeft from '@/assets/iconSvg/arrow_double_left.svg';

const SidebarCustom = defineComponent({
	name: 'SidebarCustom',
	props: {
		// 宽
		width: {
			type: [String, Number],
			default: ''
		},
		// 显示left栏
		show: {
			type: Boolean,
			default: true
		},
		// 开启改变大小
		changeSize: {
			type: Boolean,
			default: true
		},
		// 开启点击按钮收起
		openClose: {
			type: Boolean,
			default: true
		},
		onChange: {
			type: Function,
			default: () => {}
		}
	},
	setup(props, { emit, slots }) {
		const state = reactive({
			windowWidth: 0, // 页面宽度
			minWidth: 0, // 最小宽度
			maxWidth: 580, // 最大宽度
			lineStatus: false, // 线条显示
			leftShow: true, // 左侧栏显示
			leftWidth: 0, // 左侧宽度
			leftWidthHistory: 0, // 左侧宽度 - 历史记录
			pointX: 0, // x轴的位置
			left: 0 // 容器距离坐标的距离
		});
		const { proxy }: any = getCurrentInstance();

		watch(
			() => props.show,
			(n, o) => {
				if (n === o) return;
				if (n) state.leftWidth = Number(props.width || state.leftWidthHistory);
				else state.leftWidth = 0;
			}
		);

		// 获取页面宽度
		const getWindowWidth = () => {
			const { show, width } = props;
			const { leftWidth: lw, leftWidthHistory: lwh, maxWidth, leftShow } = state;
			if (lw === maxWidth) return;
			const windowWidth = window.innerWidth;
			state.windowWidth = windowWidth;

			if (width) {
				const w = Number(width);
				if (leftShow) state.leftWidth = w;
				state.leftWidthHistory = w;
				state.minWidth = w;
			} else {
				const leftWidth = windowWidth >= 1920 ? 280 : 224;
				if (((lwh && lw) || (!lwh && !lw)) && show) state.leftWidth = leftWidth;
				state.leftWidthHistory = leftWidth;
				state.minWidth = leftWidth;
			}
		};

		onMounted(() => {
			getWindowWidth();
			window.addEventListener('resize', getWindowWidth, false);
		});
		onBeforeUnmount(() => {
			window.removeEventListener('resize', getWindowWidth);
		});

		/* 竖线 鼠标操作 -s */
		const lineDown = (e: MouseEvent) => {
			if (!props.changeSize) return;
			const { left } = proxy.$el.getBoundingClientRect();
			state.left = Math.ceil(left);
			state.pointX = e.x;
		};
		const lineMove = (e: MouseEvent) => {
			if (!state.pointX) return;
			const { x } = e;
			const { minWidth, maxWidth, left } = state;
			if (x - left <= minWidth) state.pointX = minWidth + left;
			else if (x - left >= maxWidth) state.pointX = maxWidth + left;
			else state.pointX = x;
			// 设置线条右边距离
			state.leftWidth = state.pointX - left;
		};
		const lineUp = () => {
			if (!state.pointX) return;
			const { pointX, left } = state;
			state.leftWidth = pointX - left;
			state.leftWidthHistory = pointX - left;
			state.pointX = 0;
			emit('change', state.leftWidth, state.leftShow);
		};

		// 关闭左侧
		const closeLeft = () => {
			if (state.leftWidth) {
				state.leftWidth = 0;
				setTimeout(() => {
					state.leftShow = false;
				}, 300);
			} else {
				state.leftShow = true;
				setTimeout(() => {
					state.leftWidth = state.leftWidthHistory;
				});
			}
			setTimeout(() => {
				emit('change', state.leftWidth, state.leftShow);
			}, 300);
		};

		return () => {
			const { width, openClose, changeSize } = props;
			const { pointX, left, leftWidth, windowWidth, leftShow } = state;
			return (
				<div
					class={[
						'p-sidebar-custom',
						pointX && 'p-sidebar-custom-col-resize',
						windowWidth >= 1920 ? 'p-sidebar-custom-large' : 'p-sidebar-custom-normal'
					]}
					onMousemove={lineMove}
					onMouseup={lineUp}
				>
					<>
						{pointX > 0 && (
							<div
								class="p-sidebar-custom-line"
								style={{ left: `${pointX - left - 1}px` }}
							/>
						)}
					</>
					<>
						{width && (
							<div
								class={{
									'p-sidebar-custom-bar': true,
									'p-sidebar-custom-bar-change-size': changeSize && leftWidth
								}}
								style={{ left: `${leftWidth - 2}px` }}
								onMousedown={lineDown}
							/>
						)}
					</>
					<>
						{openClose && (
							<div
								class={[
									'p-sidebar-custom-btn',
									leftWidth
										? 'p-sidebar-custom-btn-normal'
										: 'p-sidebar-custom-btn-rotate'
								]}
								style={{
									left: `${leftWidth || (windowWidth >= 1920 ? 22 : 20)}px`
								}}
								onClick={closeLeft}
							>
								<ArrowDoubleLeft />
							</div>
						)}
					</>
					<div
						v-show={leftShow}
						class="p-sidebar-left"
						style={{ width: `${leftWidth}px` }}
					>
						{slots.left()}
					</div>
					<div class="p-sidebar-right" style={{ width: `calc(100% - ${leftWidth}px)` }}>
						{slots.right()}
					</div>
				</div>
			);
		};
	}
});

export default SidebarCustom;
