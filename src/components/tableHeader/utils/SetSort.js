import TreeSort from '../../TableTree/utils/TreeSort';
import QuickSort from '../../TableGrid/utils/Utils';

const SetSort = (thisObj, d) => {
    // open-开启dom显示 event-开启注册排序函数
    if (!d.sort || !d.sort.open) return;
    // status 取值['', 'seq', 'ord']，默认为空；seq-正序；ord-倒序
    if (d.sort.status) {
        if (JSON.stringify(thisObj.defaultSort).length <= 2) thisObj.defaultSort = d;
    } else d.sort.status = '';
    if (!d.sort.event || typeof d.sort.event !== 'string') return;
    // 注册-排序函数
    d.sort.func = (status, type, key) => {
        const {
            disableSort, sortAjax, headerData: headerDataSort,
            tableHistoryData: thd,
            groupName
        } = thisObj;
        if (disableSort) return;
        headerDataSort.forEach(hd => {
            if (hd.sort && hd.sort.open) {
                if (hd.key === key) {
                    hd.sort.status = status;
                } else {
                    hd.sort.status = '';
                }
            }
            // if (hd.key !== key && hd.sort && hd.sort.open) hd.sort.status = '';
        });
        // status排序方式 key当前排序的key
        thisObj.$emit(d.sort.event, status, key);
        if (sortAjax || !thd || !thd.length) return;
        // 排序操作
        let tableData;
        const componentName = thisObj.$options.name,
            tData = JSON.parse(JSON.stringify(thd));
        if (status) {
            if (componentName === 'TableTree') {
                tableData = TreeSort(tData, key, status, type);
            } else {
                if (groupName) {
                    tableData = tData.map(td => {
                        const { children } = td;
                        td.children = QuickSort(children, key, status, type);
                        return td;
                    });
                } else {
                    tableData = QuickSort(tData, key, status, type);
                }
            }
        } else {
            tableData = tData;
        }
        thisObj.setTableData(tableData);
    };

    // 查看有没有children
    /*
    const { children = [] } = d;
    if (children instanceof Array && JSON.stringify(children).length <= 4) return;
    children.forEach(cd => {
        SetSort(thisObj, cd);
    });
    */
};

export default SetSort;
