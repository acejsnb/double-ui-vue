// 判断父级是否包含某个class类名
const CheckClassName = (tag, className) => {
    const tagParent = tag.parentNode;
    if (tagParent.tagName === 'BODY') return document.body;
    if (tagParent.classList.contains(className)) {
        const { position } = window.getComputedStyle(tagParent);
        if (position === 'static' || !position) tagParent.style.position = 'relative';
        return tagParent;
    }
    return CheckClassName(tagParent, className);
};

export default CheckClassName;
