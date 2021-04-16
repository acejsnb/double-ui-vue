import { createApp } from 'vue';
import TitleTipJsx from './TitleTip';

const GetWH = (text) => {
    const { body } = document,
        div = document.createElement('div');
    div.className = 'p-tooltip-box';
    div.style.opacity = '0';
    div.textContent = text;
    body.appendChild(div);
    const { clientWidth, clientHeight } = div;
    body.removeChild(div);

    return { w: clientWidth, h: clientHeight };
};

let tipTop = 0,
    tipLeft = 0,
    dom = null,
    toolTipInstance = null,
    timer = null;

const Tooltip = (el, binding) => {
    const reg = /<\/?.+?\/?>/g; // 匹配标签元素的正则
    const winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 获取窗口的宽度
    const winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 获取窗口的高度
    // 判断当用户点击时 鼠标所处的位置以及提示框与视框四周的距离
    el.onmouseenter = (e) => {
        const { value } = binding,
            { target: { clientWidth, scrollWidth } } = e;
        let maxWidth = '420',
            title;
        if (value) {
            // 如果有传入信息则用传入信息
            const { width, text } = value;
            if (text) title = text;
            else title = value;
            if (!text && title && clientWidth === scrollWidth) return;
            if (width) maxWidth = width;
        } else {
            // 如果没有传入信息则获取目标元素的内容
            if (clientWidth <= scrollWidth) return;
            title = e.target.innerHTML.replace(reg, '');
        }
        timer = setTimeout(() => {
            dom = document.createElement('div');
            document.body.appendChild(dom);

            const {
                top, bottom, width, height
            } = e.target.getBoundingClientRect(); // 获取目标元素在页面中的位置
            const { w: tipW, h: tipH } = GetWH(title);
            const disX = e.x; // 鼠标在目标元素的横向位置
            const disY = e.y; // 鼠标在目标元素的纵向位置
            const checkTop = top > tipH - 4; // 检测屏幕上方是否有足够距离显示
            const checkBottom = winHeight - bottom > tipH - 4; // 检测屏幕下方是否有足够距离显示

            if ((disX < width / 2) && (disY < height / 2)) {
                // 第一种情况 鼠标在左上方
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
            const rw = winWidth - disX, // 右侧宽度
                w = tipW > maxWidth ? Number(maxWidth) : tipW;
            // 如果右侧宽度小于提示内容宽度 需减去右侧剩余宽度
            if (rw < w) tipLeft -= (w - rw);

            toolTipInstance = createApp(TitleTipJsx, {
                title,
                left: tipLeft,
                top: tipTop,
                maxWidth
            });
            toolTipInstance.mount(dom);
        }, 300);
    };
    const clearVm = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        Tooltip.remove();
    };
    el.onmouseleave = clearVm;
    el.onmouseup = clearVm;
};
Tooltip.remove = () => {
    if (!toolTipInstance) return;
    toolTipInstance.unmount();
    document.body.removeChild(dom);
    toolTipInstance = null;
};
export default Tooltip;
