// 生成随机字符串 len表示长度
const RandomStr = (len: number): string =>
	Math.random()
		.toString(36)
		.slice(-(typeof len === 'number' ? len : 8));

export default RandomStr;
