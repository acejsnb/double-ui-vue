/**
 * 获取滚动条宽度
 * @returns {number}
 * @constructor
 */
import IsIE from './IsIE';

const GetScrollbarWidth = () => {
    const oDiv = document.createElement('div');
    oDiv.style.cssText = 'position:absolute;top:-1000px;width:100px;height:100px;overflow:hidden;opacity:0;';
    const noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = 'scroll';
    const scroll = oDiv.clientWidth;
    if (IsIE()) oDiv.removeNode(true);
    else oDiv.remove();
    const bw = noScroll - scroll;
    return bw < 6 ? 6 : bw;
};

export default GetScrollbarWidth;
