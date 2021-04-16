/**
 * 判断平年 闰年
 * @param year
 * @returns {boolean} true - 闰年， false - 平年
 */
const leapYear = (year) => (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0));

export default leapYear;
