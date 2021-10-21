/**
 * 设置标签的title
 * @param e event
 * @param tag 标签名字
 * @constructor
 */
import FindTarget from './FindTarget';

const TextEllipsis = (e: MouseEvent, tag?: string) => {
	let target = e.target as HTMLElement;
	if (tag) target = FindTarget(target, tag);
	const { clientWidth, scrollWidth } = target;
	if (scrollWidth > clientWidth) target.title = target.textContent;
	else target.title = '';
};

export default TextEllipsis;
