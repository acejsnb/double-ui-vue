// 获取本级ip
const os = require('os');

const get_ip = () => {
	const interfaces = os.networkInterfaces();
	for (const devName in interfaces) {
		const item = interfaces[devName].find(d => (!d.internal && (d.family === 'IPv4' || d.family === 4) && d.address !== '127.0.0.1'));
		if (item) return item.address;
	}
	return undefined;
};

module.exports = get_ip;
