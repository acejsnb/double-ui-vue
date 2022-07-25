import { uuid, cloneDeep } from 'js-func-tools';

/* sort: {
    open: true, event: 'sortHandle', type: 'number', status: ''
}, */
export const header0 = [
    {
        key: 'managementRegionName', text: '管理分区', fixed: 'left', checked: 'checked'
    }, {
        key: 'climateName', text: '气候区', checked: 'uncheck'
    }, {
        key: 'microclimateName', text: '微气候区', checked: 'uncheck'
    }, {
        key: 'dataQuality',
        text: '数据质量',
        checked: 'uncheck'
    }, {
        key: 'realEnergy',
        text: '实际能耗 (kWh)',
        checked: 'checked'
    }, {
        key: 'energyPerSquare',
        text: '单平米能耗 (kWh/m²)',
        checked: 'uncheck'
    }, {
        key: 'gwData',
        text: '管控值',
        checked: 'checked'
    }, {
        key: 'realEnergyGwDataRatio',
        text: '占管控值比',
        checked: 'checked'
    }, {
        key: 'target',
        text: '目标值 (kWh)',
        checked: 'uncheck'
    }, {
        key: 'realEnergyTargetRatio',
        text: '占目标值比',
        checked: 'uncheck'
    },
    {
        key: 'handle', text: '操作', fixed: 'right', slot: true
    }
];
export const bodyData0 = [
    {
        id: '2306040001', managementRegionName: '大庆让胡路万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 1.7, realEnergy: 1267841.241630695, energyPerSquare: 6.780426168014196, gwData: 1359570.1840130298, realEnergyGwDataRatio: 93.25309252431681, target: 1382758.71829796, realEnergyTargetRatio: 91.68926037879427
    },
    {
        id: '2301030001', managementRegionName: '哈尔滨哈西万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 0.9, realEnergy: 791259.1020878329, energyPerSquare: 8.231992323011161, gwData: 686649.79701581, realEnergyGwDataRatio: 115.23473909504618, target: 714382.73136667, realEnergyTargetRatio: 110.7612302685554
    },
    {
        id: '2302030452', managementRegionName: '齐齐哈尔万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 1.9, realEnergy: 596644.3554498339, energyPerSquare: 7.113240127921909, gwData: 599086.4369103699, realEnergyGwDataRatio: 99.59236575724692, target: 642589.84, realEnergyTargetRatio: 92.84995160362853
    },
    {
        id: '2306020001', managementRegionName: '大庆萨尔图万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 3, realEnergy: 566788.2114327532, energyPerSquare: 6.411631351049245, gwData: 567290.8542182299, realEnergyGwDataRatio: 99.91139593001735, target: 578810.03965422, realEnergyTargetRatio: 97.9230097272244
    },
    {
        id: '2310000001', managementRegionName: '牡丹江万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 0.5, realEnergy: 523629.5814596949, energyPerSquare: 6.561445309253858, gwData: 553646.7909714299, realEnergyGwDataRatio: 94.57827445200816, target: 560380.90522369, realEnergyTargetRatio: 93.44172447322686
    },
    {
        id: '2308010001', managementRegionName: '佳木斯万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 1, realEnergy: 460471.86596291175, energyPerSquare: 6.17254512014627, gwData: 551403.76592926, realEnergyGwDataRatio: 83.50901724200158, target: 551479.76539302, realEnergyTargetRatio: 83.49750885868855
    },
    {
        id: '2303000001', managementRegionName: '鸡西万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 0.4, realEnergy: 425916.3659869143, energyPerSquare: 6.154327167975527, gwData: 473406.88820743, realEnergyGwDataRatio: 89.96834997472469, target: 478361.75229769, realEnergyTargetRatio: 89.03645911094114
    },
    {
        id: '2312020001', managementRegionName: '绥化万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 11.2, realEnergy: 369216.10658719286, energyPerSquare: 4.278286287221238, gwData: 575759.6455030602, realEnergyGwDataRatio: 64.12677746190367, target: 587804.41, realEnergyTargetRatio: 62.8127486466447
    },
    {
        id: '2301100001', managementRegionName: '哈尔滨香坊万达广场', climateName: '严寒地区', microclimateName: '东北_严寒', dataQuality: 1.7, realEnergy: 241010.31415932416, energyPerSquare: 6.324435264153904, gwData: 248718.26913454, realEnergyGwDataRatio: 96.90092931169187, target: 252354.47408437, realEnergyTargetRatio: 95.50467255783501
    }
];

const bodyData1: any = [];
Array.from({ length: 100 }).forEach(() => {
    bodyData1.push(...cloneDeep(bodyData0).map((d) => {
        d.id = uuid(8);
        return d;
    }));
});

export { bodyData1 };

/**
 * businessTime: { text: '--' },
 industrial: { text: '--' },
 */

export const headerData = [
    { key: 'name', text: '姓名' },
    { key: 'age', text: '年龄' },
    { key: 'hobby', text: '爱好' },
    { key: 'handle', text: '操作', slot: true }
];
export const bodyData = [
    {
        id: uuid(5), name: '晁盖', age: '46', hobby: '劫皇纲'
    },
    {
        id: uuid(5), name: '鲁智深', age: '38', hobby: '喝酒吃肉'
    },
    {
        id: uuid(5), name: '孙二娘', age: '27', hobby: '坑人'
    }
];
