const RandomNum = (minNum: number, maxNum: number) =>
	// @ts-ignore
	window.parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

export default RandomNum;
