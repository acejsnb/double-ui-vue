/** *
 * @time 2019.12.11
 * 树形结构相关辅助函数
 */
import CloneDeep from './CloneDeep';

/** *
 * 平铺树形结构
 * @param result 接收结果
 * @param tree 需要平铺的数据
 * @param pid 父级id
 * @constructor
 * @return []
 */
const TileTool = (result, tree, pid) => {
    tree.forEach(d => {
        const obj = {
            ...{
                parentId: pid,
                id: d.id,
                name: d.name,
                checked: d.checked,
                open: d.open,
                showCheckBox: d.hasOwnProperty('showCheckBox') ? d.showCheckBox : true,
                disabled: d.disabled ? d.disabled : false,
                lastNode: !(d.hasOwnProperty('children') && d.children instanceof Array && d.children.length),
                // lastNode: !(d.hasOwnProperty('children') && d.children.length),
                isleaf: d.hasOwnProperty('isleaf') ? d.isleaf : true
            },
            ...d
        };
        result.push(obj);
        if (d.children && d.children instanceof Array && d.children.length) TileTool(result, d.children, d.id);
    });
    return result;
};

/**
 * 将数据转成map对象
 * @param tile
 * @constructor
 */
const ToMapObj = (tile) => {
    const map = new Map(); // map对象
    tile.forEach(d => {
        if (!map.has(d.id)) map.set(d.id, d);
    });
    return map;
};

/**
 * 组装数据成树形结构
 * @param tile 平铺原始数据
 * @constructor
 */
const PackageTool = (tile) => {
    const result = [];
    if (!Array.isArray(tile)) return result;
    tile.forEach(item => {
        delete item.children;
    });
    const map = ToMapObj(tile);
    tile.forEach(item => {
        const parent = map.get(item.parentId);
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

/**
 * 递归查找上级数据 直到顶级
 * @param dArr
 * @param d
 * @param tupleObj
 */
const GetObjByParentId = (dArr, d, tupleObj) => {
    const obj = tupleObj.get(d.parentId);
    if (obj) {
        dArr.push(obj);
        GetObjByParentId(dArr, obj, tupleObj);
    }
};

/**
 * 把筛选到数组格式化成字符串对象
 * @param arr
 * lId 末级数据id
 * lName 末级数据name
 */
const FormatArr = (arr) => {
    let id = '',
        name = '',
        lId = '',
        lName = '',
        selected = null;
    for (let l = arr.length, i = l - 1; i >= 0; i--) {
        id += `${arr[i].id}/`;
        name += `${arr[i].name}/`;
        if (i === 0) {
            lId = arr[0].id;
            lName = arr[0].name.replace(/<[^<>]+>/g, '');
            selected = arr[0].checked === 'checked';
        }
        // obj = arr[i];
    }
    if (id) id = id.substring(0, id.length - 1);
    if (name) name = name.substring(0, name.length - 1);

    // return Object.assign({}, obj, { id, name, lId, lName, selected });
    return {
        // ...obj,
        id,
        name,
        lId,
        lName,
        selected
    };
};

/**
 * 遍历传入的筛选后的数据
 * @param data 接收结果
 * @param tile 平铺的数据
 * @param tupleObj 平铺的map对象
 */
const ByExample = (data, tile, tupleObj) => {
    tile.forEach(d => {
        const dArr = [d];
        GetObjByParentId(dArr, d, tupleObj);
        data.push(FormatArr(dArr));
    });
};

/**
 * 得到筛选后的数据 一维数据列表
 * @param tile 平铺原始数据
 * @param fData 筛选后的数据
 * @constructor
 */
const FilterTool = (tile, fData) => {
    const data = []; // 接收结果
    const tupleObj = ToMapObj(tile); // 平铺的map对象
    ByExample(data, fData, tupleObj);

    return data;
};

const ByExampleTree = (data, tile, tupleObj) => {
    tile.forEach(d => {
        const dArr = [d];
        GetObjByParentId(dArr, d, tupleObj);
        data.push(dArr);
    });
};

/**
 * 复杂数组去重
 * @param arr
 * @return {*}
 */
const Unique = (arr) => {
    const res = new Map();
    return arr.filter(d => !res.has(d.id) && res.set(d.id, d.name));
};
/**
 * 得到筛选后的数据 树形结构
 * @param tile 平铺原始数据
 * @param fData 筛选后的数据
 * @constructor
 */
const FilterTreeTool = (tile, fData) => {
    const data = []; // 接收结果
    const tupleObj = ToMapObj(tile); // 平铺的map对象
    ByExampleTree(data, fData, tupleObj);
    return PackageTool(Unique(data.flat()));
};

/**
 * 改变tree的checked状态
 * @param data
 * @return {string}
 * @constructor
 */
const ChangeStatus = (data) => {
    let checked = '';
    // 去除所有disabled状态的数据
    // data = data.filter(d => !d.disabled);
    const dataArr = data.filter(d => !d.disabled);
    if (dataArr.every(d => d.checked === 'checked')) {
        checked = 'checked';
    } else if (dataArr.every(d => d.checked === 'uncheck')) {
        checked = 'uncheck';
    } else {
        checked = 'notNull';
    }

    return checked;
};

/**
 * 通过父级id查找子级数据
 * @param result 结果
 * @param pid 父级id
 * @param tile 平铺数据
 * @constructor
 */
const GetIdByParentId = (result, pid, tile) => {
    tile.forEach(d => {
        if (d.parentId === pid) {
            result.push(d.id);
            GetIdByParentId(result, d.id, tile);
        }
    });

    return result;
};
/**
 * 通过子级id查找父级数据
 * @param result 结果
 * @param id 子级id
 * @param tile 平铺数据
 * @constructor
 */
const GetParentIdById = (result, id, tile) => {
    tile.forEach(d => {
        if (d.id === id) {
            result.push(d.parentId);
            GetParentIdById(result, d.parentId, tile);
        }
    });

    return result;
};
/**
 * 初始化数据
 * @param treeData 原始数据
 */
const initTreeData = (treeData) => {
    if (treeData && treeData.length) {
        const tempData = CloneDeep(treeData);
        return tempData.map((data) => {
            if (data.children && data.children.length) {
                data.checked = 'uncheck';
                data.showCheckBox = data.hasOwnProperty('showCheckBox') ? data.showCheckBox : true;
                data.open = data.open || false;
                data.disabled = data.disabled || false;
                data.children = initTreeData(data.children);
            } else {
                data.checked = 'uncheck';
                data.open = data.open || false;
                data.disabled = data.disabled || false;
                data.showCheckBox = data.hasOwnProperty('showCheckBox') ? data.showCheckBox : true;
            }
            return data;
        });
    }
    return [];
};

/**
 * 根据选中的数据返回一个设置好选中和展开的树结构
 * @param selectIds 选中的数据
 * @param originData 原始数据
 * @param linkage 联动选择
 * @param notNull 返回半选数据
 * @param lastStage 选择最后一级
 * @param childDisabled 选择父级子级disabled状态 默认值为false
 */
const setSelectIdSTree = (selectIds, originData, linkage, notNull, lastStage, childDisabled = false) => {
    let resultData = [];
    const TilingData = TileTool([], originData, '-1');

    const findParentAndSetStatus = parentId => {
        // 找出父级
        const parent = TilingData.find(item => item.id === parentId);
        if (parent) {
            // 找出当前父级的子集并对当前父级进行设置
            const childrenData = TilingData.filter(item => item.parentId === parentId);
            if (lastStage) {
                parent.open = true;
            } else {
                if (linkage) {
                    if (!childDisabled) {
                        parent.checked = ChangeStatus(childrenData);
                        parent.open = ChangeStatus(childrenData) !== 'uncheck';
                    }
                } else {
                    parent.open = true;
                }
            }
            findParentAndSetStatus(parent.parentId);
        } else {
            return false;
        }
    };
    const findChildAndSetStatus = id => {
        // 找出是否有子集，联动选择设置子集全选
        const childData = TilingData.filter(item => item.parentId === id),
            currentNode = TilingData.find(item => item.id === id);
        if (childData && childData.length) {
            currentNode.open = true;
            childData.forEach(item => {
                if (item.disabled) {
                    item.checked = 'checked';
                    if (linkage) {
                        findChildAndSetStatus(item.id);
                    }
                }
            });
        } else {
            return false;
        }
    };
    selectIds.forEach(id => {
        const targetIndex = TilingData.findIndex(item => item.id === id);
        if (targetIndex !== -1) {
            if (lastStage) {
                if (TilingData[targetIndex].lastNode) {
                    TilingData[targetIndex].checked = 'checked';
                }
            } else {
                TilingData[targetIndex].checked = 'checked';
                if (childDisabled) {
                    selectIds.forEach(item => {
                        TilingData.forEach(cur => {
                            if (cur.parentId === item) {
                                cur.checked = 'checked';
                                cur.disabled = true;
                            }
                        });
                    });
                }
            }
            // 树选择联动
            findParentAndSetStatus(TilingData[targetIndex].parentId);
            if (linkage) {
                findChildAndSetStatus(TilingData[targetIndex].id);
            }
        }
    });
    const selectedData = TilingData.filter(item => (notNull ? item.checked !== 'uncheck' : (item.checked === 'checked')));
    resultData = PackageTool(TilingData);
    return { resultData, selectedData };
};
export {
    TileTool,
    FilterTool,
    PackageTool,
    FilterTreeTool,
    Unique,
    ChangeStatus,
    GetIdByParentId,
    GetParentIdById,
    initTreeData,
    setSelectIdSTree
};
