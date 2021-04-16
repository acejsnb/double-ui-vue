/**
 * 计算数字
 * @returns {Array}
 */
const CountNumber = () => {
    const countTime = (len) => {
        const arr = [];
        for (let i = 0; i < len; i++) {
            arr.push({ time: i < 10 ? `0${i}` : `${i}`, disabled: false });
        }
        return arr;
    };
    const hours = countTime(24, 'h'); const minutes = countTime(60, 'm'),
        seconds = countTime(60, 's');

    return [hours, minutes, seconds];
};

export default CountNumber;
