/**
 * 检查点击弹窗外层
 * @param e event对象
 * @param dom 监听的dom对象
 * @param cb 回调
 * @constructor
 */
const ClickOutside = (e, dom, cb) => {
    if (!dom.contains(e.target)) cb();
};

export default ClickOutside;
