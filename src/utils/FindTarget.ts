/**
 * 查找对应的target节点
 * @dom node节点（e.target）
 * @tag html标签名字
 */
type FTFn = (target: HTMLElement, tag: string) => HTMLElement;
const FindTarget: FTFn = (target, tag) => {
	if (target.nodeType === 1 && target.tagName === tag) return target;
	return FindTarget(target.parentNode as HTMLElement, tag);
};

export default FindTarget;
