const GetCaptionWidth = (str) => {
    const { body } = document,
        div = document.createElement('div');
    div.className = 'p-drop-trigger-caption';
    div.innerText = str;
    div.style.position = 'absolute';
    div.style.zIndex = '-1';
    div.style.left = '0';
    div.style.bottom = '0';
    div.style.height = '0px';
    body.appendChild(div);
    const { width } = div.getBoundingClientRect(),
        w = Math.ceil(width);
    body.removeChild(div);
    if (w > 98) return 98;
    return w;
};

export default GetCaptionWidth;
