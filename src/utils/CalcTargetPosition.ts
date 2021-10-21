/**
 * 计算定位的位置
 * @param triggerDom 触发器元素
 * @param targetHeight 目标元素高度 (下拉列表)
 * @param targetWidth 目标元素宽度 (下拉列表)
 * @param alignRight 居右对齐
 * @constructor
 */
type RTc = {
	X: number;
	Y: number;
	P: boolean;
};
type Tc = (
	triggerDom: HTMLElement,
	targetHeight: number,
	targetWidth: number,
	alignRight?: boolean
) => RTc;
const CalcTargetPosition: Tc = (triggerDom, targetHeight, targetWidth, alignRight = false) => {
	const { clientHeight, clientWidth } = document.body; // 当前触发器父级的位置
	const { pageYOffset, pageXOffset } = window; // 基于window对象滚动的距离
	const { top, left, height, width } = triggerDom.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
	let Y; // 左侧位置
	let X; // 左侧位置
	let P = true; // 动画执行方向 - 默认向下

	// 1.计算top位置
	const triggerPositionTop = top - 8; // 触发器距离顶部的距离
	const triggerPositionBtm = clientHeight - (top + height + 8); // 触发器距离底部的距离
	if (triggerPositionBtm >= targetHeight) {
		// 触发器距离底部的距离 大于等于 目标元素高度，下拉列表向下弹出
		Y = top + height + 8 + pageYOffset;
	} else if (triggerPositionTop >= targetHeight) {
		// 触发器距离顶部的距离 大于等于 目标元素高度，下拉列表向上弹出
		Y = top - targetHeight - 8 + pageYOffset;
		P = false;
	} else {
		// 上下都不满足条件，位置距离页面底部为0
		// 下拉列表向下弹出
		Y = clientHeight - targetHeight + pageYOffset;
	}

	// 2.计算left位置
	const triggerLeftWidth = left; // 触发器左侧宽度
	const triggerRightWidth = clientWidth - left - width; // 触发器右侧宽度
	const leftWidth = triggerLeftWidth + width; // 左侧容量宽度
	const rightWidth = triggerRightWidth + width; // 右侧容量宽度
	// 左对齐
	if (clientWidth <= targetWidth) {
		X = pageXOffset;
	} else if (left > 0) {
		if (rightWidth >= targetWidth) {
			// 右侧可以放下下拉列表
			X = left + pageXOffset;
		} else if (leftWidth >= targetWidth) {
			// 左侧可以放下下拉列表
			X =
				left +
				width -
				targetWidth +
				pageXOffset +
				(triggerRightWidth > 0 ? 0 : triggerRightWidth);
		} else {
			X = (clientWidth - targetWidth) / 2 + pageXOffset;
		}
	} else {
		X = pageXOffset;
	}

	// 右对齐
	if (alignRight && rightWidth >= targetWidth) X = X - targetWidth + width;

	// X-left位置，Y-top位置，P-动画执行方向
	return { X, Y, P };
};

export default CalcTargetPosition;
