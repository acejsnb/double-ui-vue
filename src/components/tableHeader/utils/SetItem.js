import SetScreen from './SetScreen';
import SetSort from './SetSort';

/**
 * 设置当前item数据
 * @param thisObj
 * @param d
 * @constructor
 */
const SetItem = (thisObj, d) => {
    SetScreen(thisObj, d);
    SetSort(thisObj, d);
};

export default SetItem;
