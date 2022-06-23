// @ts-ignore
const RandomNum = (minNum: number, maxNum: number) => window.parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

export default RandomNum;
