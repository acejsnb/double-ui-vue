import './style.styl';

const GetWH = (text: string) => {
    const { body } = document;
    const div = document.createElement('div');
    div.className = 'd-title-tip';
    div.style.opacity = '0';
    div.textContent = text;
    body.appendChild(div);
    const { clientWidth, clientHeight } = div;
    body.removeChild(div);

    return { w: clientWidth, h: clientHeight };
};

type Params = {
    theme?: string
    width?: string
}

let tipTop = 0;
let tipLeft = 0;
let dom: HTMLDivElement;
let timer: number = null;

const TitleTip = (el: HTMLElement, binding: any) => {
    const reg = /<\/?.+?\/?>/g; // 匹配标签元素的正则
    const winWidth =
		window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 获取窗口的宽度
    const winHeight =
		window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 获取窗口的高度
    // 判断当用户点击时 鼠标所处的位置以及提示框与视框四周的距离
    el.onmouseenter = (e: MouseEvent) => {
        timer = window.setTimeout(() => {
            const target = e.target as HTMLElement;
            const { clientWidth, scrollWidth } = target;
            const { modifiers, value } = binding;
            if (!value && clientWidth === scrollWidth) return;
            const params: Params = {};
            Object.keys(modifiers).forEach((d) => {
                const [key, value] = d.split('@');
                params[key] = value;
            });
            const maxWidth = params.width ?? '420',
                theme = params.theme ?? 'light',
                title = value ?? target.innerHTML.replace(reg, '');

            const { top, bottom, width, height } = target.getBoundingClientRect(); // 获取目标元素在页面中的位置
            const { w: tipW, h: tipH } = GetWH(title);
            const disX = e.x; // 鼠标在目标元素的横向位置
            const disY = e.y; // 鼠标在目标元素的纵向位置
            const checkTop = top > tipH - 4; // 检测屏幕上方是否有足够距离显示
            const checkBottom = winHeight - bottom > tipH - 4; // 检测屏幕下方是否有足够距离显示

            // 第一种情况 鼠标在左上方
            if ((disX < width / 2) && (disY < height / 2)) {
                tipTop = checkTop ? top - (tipH - 4) : top + height - 4;
            }
            // 第二种情况 鼠标在右上方
            if ((disX > width / 2) && (disY < height / 2)) {
                tipTop = checkTop ? top - (tipH - 4) : top + height - 4;
            }
            // 第三种情况 鼠标在左下方
            if ((disX < width / 2) && (disY > height / 2)) {
                tipTop = checkBottom ? top + height - 4 : top - (tipH - 4);
            }
            // 第四种情况 鼠标在右下方
            if ((disX > width / 2) && (disY > height / 2)) {
                tipTop = checkBottom ? top + height - 4 : top - (tipH - 4);
            }
            tipLeft = disX;
            const rw = winWidth - disX; // 右侧宽度
            const w = tipW > Number(maxWidth) ? Number(maxWidth) : tipW;
            // 如果右侧宽度小于提示内容宽度 需减去右侧剩余宽度
            if (rw < w) tipLeft -= w - rw;
            const { pageYOffset, pageXOffset } = window;

            dom = document.createElement('div');
            dom.className = `d-title-tip d-title-tip-${theme}`;
            dom.style.left = `${tipLeft + pageXOffset}px`;
            dom.style.top = `${tipTop + pageYOffset}px`;
            dom.style.maxWidth = `${maxWidth}px`;
            dom.innerText = title;
            document.body.appendChild(dom);
        }, 300);
    };

    const clearVm = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        TitleTip.remove();
    };

    el.addEventListener('DOMNodeRemoved', clearVm);
    el.addEventListener('mouseout', clearVm);
    el.addEventListener('mousedown', clearVm);
};
TitleTip.remove = () => {
    dom && dom.parentNode.removeChild?.(dom);
    dom = null;
};
export default TitleTip;
