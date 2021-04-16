/**
 * 深拷贝对象
 * @param oriObject 原始数据
 */
const CloneDeep = (oriObject) => {
    if (oriObject && typeof oriObject === 'object') {
        const targetObject = Array.isArray(oriObject) ? [] : {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in oriObject) {
            if (Object.prototype.hasOwnProperty.call(oriObject, key)) {
                if (typeof oriObject[key] === 'object' && typeof oriObject[key]) {
                    targetObject[key] = CloneDeep(oriObject[key]);
                } else {
                    targetObject[key] = oriObject[key];
                }
            }
        }
        return targetObject;
    }
    // console.error('输入参数为空或不为对象');
    // return '输入参数为空或不为对象';
    return [];
};
export default CloneDeep;
