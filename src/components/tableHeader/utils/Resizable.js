// 拖动列改变列宽度
const ResizeDown = (thisObj, startX, ind) => {
    thisObj.colIndex = ind;
    thisObj.startX = startX;
    thisObj.oldWidth = thisObj.colWidth[ind];
};

const ResizeMove = (thisObj, e) => {
    const {
            headerData,
            colWidth,
            colIndex,
            startX
        } = thisObj,
        { minWidth = 0 } = headerData[colIndex],
        mcw = minWidth && minWidth < 60 ? 60 : minWidth,
        { x } = e;
    if (!startX) return;
    const oldWidth = colWidth[colIndex],
        diff = x - startX,
        w = Math.ceil(oldWidth + diff);
    thisObj.currentWidth = w < mcw ? mcw : w;
    if (w < mcw) return;
    const { left } = thisObj.$el.getBoundingClientRect();
    thisObj.lineLeft = x - left;
};

const ResizeUp = (thisObj) => {
    if (!thisObj.startX) return;
    const { oldWidth, currentWidth } = thisObj;
    if (currentWidth <= 0) return;
    const changeW = currentWidth - oldWidth;
    thisObj.changeColWidth(thisObj.colIndex, Number(currentWidth), changeW);
    thisObj.colIndex = 0;
    thisObj.startX = 0;
    thisObj.currentWidth = 0;
    thisObj.oldWidth = 0;
    thisObj.lineLeft = 0;
    thisObj.$emit('resizableHandle', Number(currentWidth), thisObj.colWidth);
};

export {
    ResizeDown,
    ResizeMove,
    ResizeUp
};
