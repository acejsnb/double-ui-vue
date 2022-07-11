const GetCaptionWidth = (str: string): number => {
    const { body } = document;
    const div = document.createElement('div');
    div.className = 'd-drop-trigger-caption';
    div.innerText = str;
    div.style.position = 'absolute';
    div.style.zIndex = '-1';
    div.style.left = '0';
    div.style.bottom = '0';
    div.style.height = '0px';
    body.appendChild(div);
    const { width } = div.getBoundingClientRect();
    const w = Math.ceil(width);
    body.removeChild(div);
    if (w > 98) return 98;
    return w;
};

export default GetCaptionWidth;
