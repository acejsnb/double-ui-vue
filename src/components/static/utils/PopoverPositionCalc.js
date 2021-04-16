/**
  * @param {*} pDom 触发器节点
  * @param {*} tDom 弹出框节点
  * @param {*} leftW 箭头尖距离触发器左边缘的距离
  * @param {*} tipPlace 弹出框弹出的位置 上/下
  * @param {*} distance 弹出框距离触发器节点的距离
  */
export function calcTipPosition(pDom, tDom, leftW, tipPlace, distance) {
    const { clientHeight, clientWidth } = document.body;
    const { pageYOffset, pageXOffset } = window;
    let pointerPos = '', // 设置箭头的位置
        finalLeft, finalTop, finalBottom, tranigleLeft;
    const checkLeftDis = (tDom.width / 2 - leftW) >= pDom.left; // 左边空间不够
    const checkRightDis = (tDom.width / 2 - (pDom.width - leftW)) >= (clientWidth - pDom.right); // 右边空间不够
    const checkTop = pDom.top <= (tDom.height + distance); // 顶部空间不够
    const checkBottom = clientHeight - pDom.bottom <= tDom.height + distance; // 底部空间不够

    const bottomDis = clientHeight - pDom.bottom + pDom.height + distance; // 弹出框在上面
    const topDis = pDom.top + pDom.height + distance; // 弹出框在下面时

    // 处理上下的距离
    function calcTopBottomDistance() {
        if (tipPlace === 'top') {
            if (checkTop) { // 顶部空间不足够容纳弹出框
                finalTop = topDis + pageYOffset; // 则设置在底部显示
                pointerPos = 'top';
            } else {
                finalBottom = bottomDis - pageYOffset; // 顶部空间足够容纳弹出框
                pointerPos = 'bottom';
            }
        } else {
            if (checkBottom) { // 底部空间不足够容纳弹出框
                finalBottom = bottomDis - pageYOffset;
                pointerPos = 'bottom';
            } else {
                finalTop = topDis + pageYOffset;
                pointerPos = 'top';
            }
        }
    }

    // 左右距离的处理
    if (tDom.width > clientWidth) { // 弹出框宽度大于窗口
        finalLeft = 0 + pageXOffset;
        tranigleLeft = pDom.left + leftW - 6;
        calcTopBottomDistance();
    } else if ((pDom.right > clientWidth) && ((clientWidth - pDom.left) < tDom.width)) { // 右边被遮住并且可见部分不足够展示
        finalLeft = clientWidth - tDom.width + pageXOffset;
        tranigleLeft = (pDom.left - clientWidth + tDom.width) + leftW - 6;
        calcTopBottomDistance();
    } else {
        if (checkLeftDis) { // 左边距离不够显示弹出框
            finalLeft = pDom.left + pageXOffset;
            tranigleLeft = leftW - 6;
        } else if (checkRightDis) { // 右边距离不够显示弹出框
            finalLeft = pDom.left - tDom.width + pDom.width + pageXOffset;
            tranigleLeft = tDom.width - pDom.width + leftW - 6;
        } else {
            finalLeft = pDom.left - (tDom.width / 2 - leftW) + pageXOffset;
            tranigleLeft = tDom.width / 2 - 6;
        }
        calcTopBottomDistance();
    }
    return {
        finalLeft, finalTop, finalBottom, tranigleLeft, pointerPos
    };
}
