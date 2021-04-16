/**
 * 获取上一年
 * @date 格式为：[2019,10,30]
 * @return String
 */
const CountPrevYear = ([YY, MM, DD]) => {
    const year = YY - 1,
        month = MM,
        date = new Date(year, month, 0),
        day2 = date.getDate();
    let day = parseInt(DD);
    if (day > day2) day = day2;

    return `${year}.${month}.${day < 10 ? `0${day}` : day}`;
};

export default CountPrevYear;
