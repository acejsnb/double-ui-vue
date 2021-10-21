const RandomNum = (minNum: number, maxNum: number) =>
	// @ts-ignore
	window.parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
const strategyStatus = ['已执行', '未执行', '审核中', '已审批'];
const dataStatus = ['异常', '正常'];

const CreateJson = (num: number) => {
	const arr = [];
	for (let i = 0; i < num; i++) {
		arr.push({
			id: String(i),
			name: { text: `青阳万达广场${i}` },
			date: {
				text: `20${RandomNum(10, 19)}-${i % 2 ? '0' : '1'}${
					i % 2 ? RandomNum(0, 9) : RandomNum(0, 2)
				}-${RandomNum(0, 2)}${RandomNum(1, 9)}`.replace(/-/g, '.')
			},
			strategyStatus: { text: strategyStatus[RandomNum(0, 3)] },
			strategyTime: {
				text: `${RandomNum(0, i % 2 ? 2 : 1)}${RandomNum(0, i % 2 ? 3 : 9)}:${RandomNum(
					0,
					5
				)}${RandomNum(0, 9)}`
			},
			executeTime: {
				text: `${RandomNum(0, i % 2 ? 2 : 1)}${RandomNum(0, i % 2 ? 3 : 9)}:${RandomNum(
					0,
					5
				)}${RandomNum(0, 9)}`
			},
			dataStatus: { text: dataStatus[RandomNum(0, 1)] },
			viscosityTemperature: { text: RandomNum(0, 40) },
			outdoorTemperature: { text: RandomNum(0, 40) }
		});
	}
	return arr;
};

export default CreateJson;
