/**
 * 设置筛选列表
 * @param thisObj
 * @param item
    key header数据的key值
    status 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
    id screen.data的id
    selectedData screen.data选中的数据
 * @param flag 可选值：add-添加，del-删除
 * @constructor
 */

const SetScreenArray = (thisObj, item, flag) => {
    const { screenArray } = thisObj;
    const result = screenArray.filter(d => {
        if (d.key !== item.key) return d;
        return null;
    });
    if (flag === 'add') result.push(item);
    thisObj.screenArray = result;
};

/**
 * 注册筛选函数
 * @param thisObj
 * @param d 当前item
 * @param parentKey 父级key
 * @constructor
 */
const SetScreen = (thisObj, d, parentKey) => {
    if (parentKey) d.parentKey = parentKey;
    const { key: pKey, screen, children = [] } = d;
    if (screen && screen.open && screen.event) {
        d.screen.func = (status = 'single', key, id, selectedData, icon, pk) => {
            // thisObj.changeLoadingShow(true);
            if (icon === 'screen') {
                SetScreenArray(thisObj, {
                    key, status, id, selectedData
                }, id ? 'add' : 'del');
                const { data } = thisObj;
                if (data && data.length) thisObj.setTableData(JSON.parse(JSON.stringify(data)), true);
            }
            thisObj.$emit(d.screen.event, key, id, pk);
        };
        d.screen.selectId = '';
        d.screen.selectName = '';

        // 获取、设置筛选的项
        const screenData = screen.data;
        if (screenData && screenData instanceof Array && JSON.stringify(screenData).length > 4) {
            const { status } = d.screen;
            if (status) {
                if (status.includes('multiple')) {
                    const selectedData = screenData.filter(sdf => sdf.checked === 'checked');
                    if (selectedData && selectedData.length) {
                        SetScreenArray(thisObj, {
                            key: d.key,
                            status,
                            id: selectedData.map(sdm => sdm.id),
                            selectedData
                        }, 'add');
                    }
                } else {
                    const selectedData = screenData.find(sdf => (sdf.id && sdf.id !== 'all' && sdf.checked === 'checked')) || {};
                    if (selectedData.id) {
                        d.screen.selectId = selectedData.id;
                        d.screen.selectName = selectedData.name;
                        SetScreenArray(thisObj, {
                            key: d.key,
                            status,
                            id: selectedData.id,
                            selectedData
                        }, 'add');
                    }
                }
            }
        }
    }

    // 查看有没有children
    if (children instanceof Array && JSON.stringify(children).length <= 4) return;
    children.forEach(cd => {
        SetScreen(thisObj, cd, pKey);
    });
};

export default SetScreen;
