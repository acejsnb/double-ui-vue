/**
 * 计算当前时间在一周内的开始、结束时间
 * @param date String '2020.01.06'
 * @param speed 需要加减的参数，如6、-6
 * @return {string}
 * @constructor
 */
const CountStartOrEndDate = (date, speed) => {
    const d = new Date(date);
    d.setDate(d.getDate() + speed);
    const Y = d.getFullYear(); const M = d.getMonth() + 1; const
        D = d.getDate();
    return (`${Y}.${M < 10 ? `0${M}` : M}.${D < 10 ? `0${D}` : D}`);
};

export default CountStartOrEndDate;
