import CloneDeep from '../../static/utils/CloneDeep';
import SetItem from './SetItem';

// 获取table每列的宽
const GetColWidth = (thisObj, header) => {
    const {
            average, checkbox, border,
            rowTools, rowNumber, percent,
            width, hasBar, scrollBar
        } = thisObj,
        { open = false, width: rowToolWidth = 0 } = rowTools,
        { clientWidth = 500 } = thisObj.$el; // table占dom宽度
    thisObj.clientWidth = clientWidth;

    let widthPrams = percent ? clientWidth : width, // 传入的宽度
        tableWidth = 0,
        averageWidth = Number(average),
        surplus = 0; // 多余的宽度
    if (percent) {
        const hLen = header.filter(d => d.checked === 'checked').length || 1; // 头部数据长度
        const realWidth = clientWidth - (checkbox ? 48 : 0) - (rowNumber ? 68 : 0),
            aw = Math.ceil(realWidth / (hLen + (open ? 1 : 0))); // 每一列平均宽度
        if (aw > average) averageWidth = aw;
    }
    const colWidth = header.map(d => {
        const w = Number(d.width),
            curWidth = w || averageWidth;
        tableWidth += curWidth;
        return curWidth;
    });
    const lio = colWidth.lastIndexOf(averageWidth),
        lastIndex = lio > -1 ? lio : colWidth.length - 1; // 查找最后一个没有自定义宽度的元素，如果找不到就计算最后一个

    tableWidth += ((checkbox ? 48 : 0) + (rowNumber ? 68 : 0));
    if (percent && colWidth.every(d => d === averageWidth) && tableWidth >= clientWidth) {
        surplus = tableWidth - clientWidth;
        colWidth[lastIndex] -= surplus;
        widthPrams -= surplus;
        tableWidth -= surplus;
    }
    // 操作栏开启
    if (open) {
        if (rowToolWidth) {
            tableWidth += rowToolWidth;
            colWidth.push(rowToolWidth);
        } else {
            tableWidth += averageWidth;
            colWidth.push(averageWidth);
        }
    }

    if (border) {
        colWidth[lastIndex] -= 2;
        widthPrams -= 2;
        tableWidth -= 2;
    }

    if (hasBar) {
        colWidth[lastIndex] -= scrollBar;
        widthPrams -= scrollBar;
        tableWidth -= scrollBar;
    }
    // 外层宽度大于每列宽度之和
    if (tableWidth < widthPrams) {
        colWidth[lastIndex] += (widthPrams - tableWidth);
        tableWidth = widthPrams;
    }
    return { colWidth, tableWidth, lastIndex };
};

/**
 * 设置table每列宽度
 * @param thisObj
 * @param header 头部数据
 */
const SetColWidth = (thisObj, header) => {
    const {
            checkbox, fixedHeaderLeftData, fixedHeaderRightData,
            rowTools, rowNumber
        } = thisObj,
        { open = false } = rowTools;

    // table左侧每列宽度
    let leftWidth = (checkbox ? 48 : 0) + (rowNumber ? 68 : 0),
        rightWidth = 0; // table右侧每列宽度
    // table每列宽度
    const { colWidth, tableWidth, lastIndex } = GetColWidth(thisObj, header);
    thisObj.tableWidth = tableWidth || 500;
    thisObj.colWidth = colWidth;
    thisObj.lastIndex = lastIndex;

    // 设置固定列宽度
    const lenLeft = fixedHeaderLeftData.length,
        colWidthLeft = [],
        colWidthRight = [];
    if (lenLeft) {
        for (let i = 0; i < lenLeft; i++) {
            const curWidth = colWidth[i];
            leftWidth += curWidth;
            colWidthLeft.push(curWidth);
        }
        thisObj.fixedLeftWidth = leftWidth;
        thisObj.colWidthLeft = colWidthLeft;
    }
    const lenRight = fixedHeaderRightData.length + (open ? 1 : 0),
        colLen = colWidth.length;

    if (lenRight) {
        for (let j = 0; j < lenRight; j++) {
            const cw = colWidth[colLen - 1 - j];
            rightWidth += cw;
            colWidthRight.unshift(cw);
        }
        thisObj.fixedRightWidth = rightWidth;
        thisObj.colWidthRight = colWidthRight;
    }
};

/**
 * 设置头部数据
 * @param thisObj this对象
 * @param data header数据
 * @param history 表示设置历史数据
 * @constructor
 */
const SetHeaderData = (thisObj, data, history) => {
    if (!data || !data.length) return;
    const dataFormat = data;
    if (thisObj.$options.name === 'TableGrid') thisObj.disableSort = dataFormat.some(d => d.rowSpan && d.rowSpan.length);
    const headerData = [],
        fixedHeaderLeftData = [],
        fixedHeaderRightData = [],
        strategy = {
            left(d) {
                fixedHeaderLeftData.push(d);
            },
            right(d) {
                fixedHeaderRightData.push(d);
            }
        };
    const formatData = dataFormat.map(d => {
        d.checked = d.checked || 'checked'; // checked表示显示
        d.disabled = (typeof d.disabled === 'boolean' ? d.disabled : false);

        // 设置当前item数据
        SetItem(thisObj, d);

        // 筛选固定数据
        if (d.checked === 'checked') {
            if (d.fixed) strategy[d.fixed](d);
            headerData.push(d);
        }
        return d;
    });

    thisObj.headerSettingData = CloneDeep(formatData);
    if (thisObj.hsDrop) thisObj.hsDrop.data = thisObj.headerSettingData;
    if (history) thisObj.headerHistoryData = CloneDeep(formatData);
    // 设置头部数据
    thisObj.headerData = headerData;
    // 设置固定数据
    thisObj.fixedHeaderLeftData = fixedHeaderLeftData;
    thisObj.fixedHeaderRightData = fixedHeaderRightData;

    // 设置table每列宽度
    SetColWidth(thisObj, headerData);
};

/**
 * 设置-选中的状态
 * @param thisObj
 * @param checkedData 选中的数据
 * @constructor
 */
const CheckedHandle = (thisObj, checkedData) => {
    const { screenArray, data } = thisObj,
        keyArr = [], // 筛选出header数据的key
        sdArr = []; // 有删选的数据
    checkedData.forEach(d => {
        keyArr.push(d.key);
        if (d.screen && d.screen.open && d.screen.event) {
            // 获取、设置筛选的项
            const { status, data: screenData } = d.screen;
            if (screenData && screenData instanceof Array && JSON.stringify(screenData).length > 4) {
                if (status && status.includes('multiple')) {
                    const selectedData = screenData.filter(sdf => sdf.checked === 'checked');
                    if (selectedData && selectedData.length) {
                        sdArr.push({
                            key: d.key,
                            status,
                            id: selectedData.map(sdm => sdm.id),
                            selectedData
                        });
                    }
                } else {
                    const selectedData = screenData.find(sdf => (sdf.id && sdf.id !== 'all' && sdf.checked === 'checked')) || {};
                    if (selectedData.id) {
                        d.screen.selectId = selectedData.id;
                        d.screen.selectName = selectedData.name;
                        sdArr.push({
                            key: d.key,
                            status,
                            id: selectedData.id,
                            selectedData
                        });
                    }
                }
            }
        }
    });
    const say = screenArray.filter(d => keyArr.includes(d.key));
    thisObj.screenArray = [...say, ...sdArr];
    thisObj.headerData = checkedData;
    // 设置table每列宽度
    SetColWidth(thisObj, checkedData);
    // 设置table数据
    if (!data || !data.length) return;
    thisObj.setTableData(JSON.parse(JSON.stringify(data)), true);
};

export {
    SetHeaderData,
    CheckedHandle,
    SetColWidth
};
