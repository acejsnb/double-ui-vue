/** *
 * 获取文字隐藏的宽度
 * @param maxWidth 用于计算的可容纳的最大宽度
 * @param text 需要计算的文字
 * @return Number
 */

const GetTextHideWidth = (maxWidth = 0, text: string): number => {
    const div = document.createElement('div');
    div.style.display = 'inline-block';
    div.style.position = 'absolute';
    div.style.height = '0';
    div.style.fontSize = '14px';
    div.innerText = text;
    document.body.appendChild(div);
    const { width } = div.getBoundingClientRect(),
        w = Math.ceil(width);
    document.body.removeChild(div);
    if (w <= maxWidth) return 0;
    return w - maxWidth;
};

export default GetTextHideWidth;
