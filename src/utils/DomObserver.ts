/**
 * 监听dom变化
 * @param ele dom对象
 * @param options 参数
 * @param cb 回调
 * @returns {*}
 * @constructor
 */
type TOptions = {
	attributes: boolean;
	childList: boolean;
	subtree: boolean;
};
type TCb = () => {};
type Options = { ele: HTMLElement; options: TOptions; cb: TCb };
type TDomObserver = (options: Options) => any;

const DomObserver: TDomObserver = ({
    ele,
    options = { attributes: true, childList: true, subtree: true },
    cb
}) => {
    const {
        MutationObserver = null,
        WebKitMutationObserver = null,
        MozMutationObserver = null
    } = window as any;
    const ObjObserver = MutationObserver || WebKitMutationObserver || MozMutationObserver || null;
    if (!ObjObserver) return;
    let Observer = new ObjObserver(cb);
    Observer.observe(ele, options);
    Observer.close = () => {
        Observer.disconnect();
        Observer = null;
    };
    return Observer;
};

export default DomObserver;
