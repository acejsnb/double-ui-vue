import './style.styl';

type Params = {
    theme?: string
    width?: string
}

// 创建dom
type RCreateDom = {
    div: HTMLDivElement
    setDomStyle: (options: {[key: string]: string}) => void
    removeDomStyle: (key: string) => void
}
const createDom = (theme: string, title: string): RCreateDom => {
    const div = document.createElement('div');
    div.style.setProperty('opacity', '0');
    div.className = `d-title-tip d-title-tip-${theme}`;
    div.innerText = title;
    document.body.appendChild(div);
    // 设置dom的样式
    const setDomStyle = (options: {[key: string]: string}) => {
        Object.keys(options).forEach(key => {
            div.style.setProperty(key, options[key]);
        });
    };
    const removeDomStyle = (key: string) => {
        div.style.removeProperty(key);
    };
    return { div, setDomStyle, removeDomStyle };
};

const TitleTip = (el: HTMLElement, binding: any) => {
    let dom: HTMLDivElement;
    let timer: number = null;
    // 判断当用户点击时 鼠标所处的位置以及提示框与视框四周的距离
    el.onmouseenter = (e: MouseEvent) => {
        timer = window.setTimeout(() => {
            const reg = /<\/?.+?\/?>/g; // 匹配标签元素的正则
            const winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 获取窗口的宽度
            const winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 获取窗口的高度
            const target = e.target as HTMLElement;
            const { clientWidth, scrollWidth } = target;
            const { modifiers, value } = binding;
            if (!value && clientWidth === scrollWidth) return; // 没有设置value且文字没出现省略号，则不弹窗tip
            const params: Params = {};
            Object.keys(modifiers).forEach((d) => {
                const [key, value] = d.split('@');
                params[key] = value;
            });
            const maxWidth = params.width ?? '420',
                theme = params.theme ?? 'light',
                title = value ?? target.innerHTML.replace(reg, '');
            const { div, setDomStyle, removeDomStyle } = createDom(theme, title);
            dom = div;

            const { top, bottom, width, height } = target.getBoundingClientRect(); // 获取目标元素在页面中的位置
            const { clientWidth: tipW, clientHeight: tipH } = dom;
            const disX = e.x; // 鼠标在目标元素的横向位置
            const disY = e.y; // 鼠标在目标元素的纵向位置
            const checkTop = top > tipH - 4; // 检测屏幕上方是否有足够距离显示
            const checkBottom = winHeight - bottom > tipH - 4; // 检测屏幕下方是否有足够距离显示

            let tipTop = 0;
            let tipLeft = disX;
            if ((disX < width / 2) && (disY < height / 2)) {
                // 第一种情况 鼠标在左上方
                tipTop = checkTop ? top - (tipH - 4) : top + height - 4;
            } else if ((disX > width / 2) && (disY < height / 2)) {
                // 第二种情况 鼠标在右上方
                tipTop = checkTop ? top - (tipH - 4) : top + height - 4;
            } else if ((disX < width / 2) && (disY > height / 2)) {
                // 第三种情况 鼠标在左下方
                tipTop = checkBottom ? top + height - 4 : top - (tipH - 4);
            } else if ((disX > width / 2) && (disY > height / 2)) {
                // 第四种情况 鼠标在右下方
                tipTop = checkBottom ? top + height - 4 : top - (tipH - 4);
            }
            const rw = winWidth - disX; // 右侧宽度
            const w = tipW > Number(maxWidth) ? Number(maxWidth) : tipW;
            // 如果右侧宽度小于提示内容宽度 需减去右侧剩余宽度
            if (rw < w) tipLeft -= w - rw;
            const { pageYOffset, pageXOffset } = window;

            removeDomStyle('opacity');
            setDomStyle({
                left: `${tipLeft + pageXOffset}px`,
                top: `${tipTop + pageYOffset}px`,
                'max-width': `${maxWidth}px`
            });
        }, 300);
    };

    const remove = () => {
        dom.parentNode.removeChild?.(dom);
        dom = null;
    };

    const clearVm = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        dom && remove();
    };

    el.addEventListener('DOMNodeRemoved', clearVm);
    el.addEventListener('mouseout', clearVm);
    el.addEventListener('mousedown', clearVm);
    return remove;
};

export default TitleTip;
