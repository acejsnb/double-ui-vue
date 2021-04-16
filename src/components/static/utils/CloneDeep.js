/**
 * 深拷贝对象
 * @param obj 原始数据
 */
const CloneDeep = (obj) => {
    // 定义对象来判断当前的参数是数组还是对象
    const cloneObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        const keys = Object.keys(obj);
        keys.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (obj[key] && typeof obj[key] === 'object') cloneObj[key] = CloneDeep(obj[key]);
                else cloneObj[key] = obj[key];
            }
        });
    }
    return cloneObj;
};
export default CloneDeep;
