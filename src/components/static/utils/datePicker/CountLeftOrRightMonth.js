/**
 * 计算两个月相差多个个月
 * @param start 开始年月
 * @param end 结束年月
 * @returns {number}
 * @constructor
 */

const CountMonthDiff = (start, end) => {
    const [y1, m1] = start.split('.'),
        [y2, m2] = end.split('.'),
        startTime = new Date(y1, m1 - 1),
        endTime = new Date(y2, m2 - 1),
        startDate = startTime.getDate() + startTime.getHours() / 24 + startTime.getMinutes() / 24 / 60,
        endDate = endTime.getDate() + endTime.getHours() / 24 + endTime.getMinutes() / 24 / 60;
    let date2Mon;
    if (endDate >= startDate) date2Mon = 0;
    else date2Mon = -1;
    return (endTime.getFullYear() - startTime.getFullYear()) * 12 + endTime.getMonth() - startTime.getMonth() + date2Mon;
};

/**
 * 计算当前月
 * @param Y
 * @param M
 * @param len
 * @returns {{month: number, year: number}}
 */
const CountBeforeOrAfterMonth = (Y, M, len) => {
    const date = new Date(Y, M - 1 + len),
        year = date.getFullYear(),
        month = date.getMonth() + 1;
    return { year, month };
};

/**
 * 点击箭头单多月
 * @param F 标识符 left-向左减时间，right-向右加时间
 * @param start 开始年月
 * @param end 结束年月
 * @returns []
 */
const CountLeftOrRightMonth = (F, start, end) => {
    const [y1, m1] = start.split('.'),
        [y2, m2] = end.split('.');
    let sy,
        sm, // 计算后的开始年月
        ey,
        em; // 计算后的结束年月
    const diff = CountMonthDiff(start, end);
    if (F === 'left') {
        // 计算结束时间
        const { year: ey1, month: em1 } = CountBeforeOrAfterMonth(y1, m1, -1);
        ey = `${ey1}`;
        em = em1 < 10 ? `0${em1}` : `${em1}`;
        // 计算开始时间
        const { year: sy1, month: sm1 } = CountBeforeOrAfterMonth(ey, em, -diff);
        sy = `${sy1}`;
        sm = sm1 < 10 ? `0${sm1}` : `${sm1}`;
    } else {
        // 计算开始时间
        // 获取当前月的天
        const { year: sy1, month: sm1 } = CountBeforeOrAfterMonth(y2, m2, 1);
        sy = `${sy1}`;
        sm = sm1 < 10 ? `0${sm1}` : `${sm1}`;
        // 计算结束时间
        const { year: ey1, month: em1 } = CountBeforeOrAfterMonth(sy, sm, diff);
        ey = `${ey1}`;
        em = em1 < 10 ? `0${em1}` : `${em1}`;
    }

    return [sy, sm, ey, em];
};

export default CountLeftOrRightMonth;
