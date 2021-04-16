const RandomNum = (minNum, maxNum) => window.parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);

export default RandomNum;
