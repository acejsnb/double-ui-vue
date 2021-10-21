/** *
 * 数组去重
 * 设置padding-left
 * @param data 数据列表
 * @param key 根据key去重
 * @param reverse 数据反向
 * @return []
 */
const DeWeight = (data: any[], key: string | number, reverse: any) => {
	const arr = reverse ? data.reverse() : data;
	const obj = {};
	const result = arr.reduce((cur, next) => {
		if (!obj[next[key]]) obj[next[key]] = cur.push(next);
		return cur;
	}, []);
	return reverse ? result.reverse() : result;
};

export default DeWeight;
