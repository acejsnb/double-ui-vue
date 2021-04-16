const header = [
    {
        key: 'name',
        text: '项目名称',
        fixed: 'left',
        // width: 300,
        resizable: true
        // disabled: true
    },
    {
        key: 'date',
        text: '日期',
        // sort: {
        //     open: true, type: 'date', status: 'seq', event: 'sortHandle', closeDefault: true
        // },
        resizable: true
        // fixed: 'left',
        // width: 160
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        align: 'right',
        // fixed: 'left',
        tip: {
            open: true,
            text: '策略状态包括已执行、未执行、审核中、已审批'
        },
        resizable: true,
        minWidth: 100,
        // sort: {
        //     open: true, status: 'seq', event: 'sortHandle', closeDefault: true
        // },
        screen: {
            open: true,
            status: 'multiple', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
            data: [
                {
                    id: 'executed',
                    name: '已执行',
                    checked: 'checked'
                },
                {
                    id: 'non-execution',
                    name: '未执行',
                    checked: 'checked'
                },
                {
                    id: 'audit',
                    name: '审核中'
                },
                {
                    id: 'has-approval',
                    name: '已审批'
                }
            ],
            event: 'screenHandle'
        },
        width: 240
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        screen: {
            open: true,
            status: 'multiple', // 筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
            data: [
                {
                    id: 'all',
                    name: '全部'
                },
                {
                    id: '06:30',
                    name: '06:30'
                },
                {
                    id: '06:31',
                    name: '06:31'
                },
                {
                    id: '06:32',
                    name: '06:32'
                },
                {
                    id: '06:33',
                    name: '06:33'
                },
                {
                    id: '07:34',
                    name: '07:34'
                }
            ],
            event: 'screenHandle'
        }
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        checked: 'uncheck'
    },
    {
        key: 'dataStatus',
        text: '数据状态',
        tip: {
            open: true,
            text: '1.室外平均温度=逐日营业时段室外平均温度均'
        }
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)',
        tip: {
            open: true,
            text: '2.室外平均温度=逐日营业时段室外平均温度均'
        }
        // fixed: 'right'
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)',
        // checked: 'uncheck',
        // disabled: true,
        tip: {
            open: true,
            text: '3.室外平均温度=逐日营业时段室外平均温度'
        },
        fixed: 'right',
        align: 'right',
        sort: {
            open: true,
            status: 'ord',
            type: 'number',
            event: 'sortHandle',
            closeDefault: true
        }
    }
];
const header2 = [
    {
        key: 'name',
        text: '项目名称',
        // fixed: 'left',
        sort: {
            open: true,
            event: 'sortHandle'
        }
    },
    {
        key: 'date',
        text: '日期'
    },
    {
        key: 'strategyStatus',
        text: '策略状态'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        sort: {
            open: true,
            event: 'sortHandle'
        }
    },
    {
        key: 'executeTime',
        text: '应执行时间'
    },
    {
        key: 'dataStatus',
        text: '数据状态'
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)',
        sort: {
            open: true,
            event: 'sortHandle'
        }
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)'
    }
];

const header4 = [
    {
        text: '管理分区',
        dataIndex: 'managementRegionName',
        key: 'managementRegionName',
        show: true,
        isOrder: false,
        width: 300,
        disabled: true,
        fixed: 'left'
    }, {
        text: '实际能耗 (kWh)',
        dataIndex: 'realEnergy',
        key: 'realEnergy',
        show: true,
        sort: {
            open: true,
            event: 'sortHandle',
            status: 'ord'
        },
        width: 200,
        disabled: true,
        align: 'right'
    }, {
        text: '单平米能耗 (kWh/m²)',
        dataIndex: 'energyPerSquare',
        key: 'energyPerSquare',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right'
    }, {
        text: '管控值',
        dataIndex: 'gwData',
        key: 'gwData',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right',
        title: '管控值(7.01-7.21) (kWh)'
    }, {
        text: '实际能耗占管控值比',
        dataIndex: 'realEnergyGwDataRatio',
        key: 'realEnergyGwDataRatio',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            status: 'ord'
        }
    }, {
        text: '目标值 (kWh)',
        dataIndex: 'target',
        key: 'target',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            status: 'ord'
        }
    }, {
        text: '实际能耗占目标值比',
        dataIndex: 'realEnergyTargetRatio',
        key: 'realEnergyTargetRatio',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right'
    }, {
        text: '能耗同比',
        dataIndex: 'energySameRatio',
        key: 'energySameRatio',
        msg: '能耗同比',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right'
    }, {
        text: '能耗环比',
        dataIndex: 'energyRingRatio',
        key: 'energyRingRatio',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right'
    }, {
        text: '超标周数',
        dataIndex: 'exceedWeekLogNum',
        key: 'exceedWeekLogNum',
        show: true,
        isOrder: false,
        width: 200,
        align: 'right',
        checked: 'uncheck'
    }, {
        text: '已填写周报数',
        dataIndex: 'fillWeekLogNum',
        key: 'fillWeekLogNum',
        show: true,
        isOrder: false,
        width: 200,
        align: 'right',
        checked: 'uncheck'
    }, {
        text: '年累计实际能耗 (kWh)',
        dataIndex: 'realEnergyYear',
        key: 'realEnergyYear',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right'
    }, {
        text: '年总定额 (kWh)',
        dataIndex: 'targetYear',
        key: 'targetYear',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right'
    }, {
        text: '年实际能耗占年总定额比',
        dataIndex: 'realEnergyTargetYearRatio',
        key: 'realEnergyTargetYearRatio',
        show: false,
        isOrder: true,
        width: 300,
        align: 'right'
    }];
const data4 = [
    {
        gwEndDate: { text: '2020-01-31 00:00:00' },
        realEnergyTargetRatio: { text: '109.22%' },
        energyPerSquare: { text: '4.98' },
        energySameRatio: { text: '--' },
        realEnergy: {
            text: '442,772.66',
            slotName: 'slot3101180002'
        },
        realEnergyYear: { text: '2,179,121.69' },
        exceedWeekLogNum: { text: [] },
        managementRegionName: {
            text: '上海青浦万达茂',
            slotName: 'slot3101180002'
        },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: '381,769.74' },
        targetYear: { text: '6,232,421.60' },
        managementRegionId: '3101180002',
        realEnergyGwDataRatio: { text: '115.98%' },
        target: { text: '405,391.15' },
        realEnergyTargetYearRatio: { text: '34.96%' },
        climateName: { text: '夏热冬冷地区' },
        dataQuality: { text: '--' },
        microclimateName: { text: '华东_夏热冬冷' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        projectId: { text: 'Pj3101180001' },
        energyRingRatio: { text: '-20.28%' },
        id: '3101180002',
        link: true
    }, {
        gwEndDate: { text: '2020-01-31 00:00:00' },
        realEnergyTargetRatio: { text: '92.95%' },
        energyPerSquare: { text: '4.56' },
        energySameRatio: { text: '129008.67%' },
        realEnergy: {
            text: '339,555.80',
            slotName: 'slot3101150001'
        },
        realEnergyYear: { text: '1,793,727.94' },
        exceedWeekLogNum: { text: [] },
        managementRegionName: {
            text: '上海周浦万达广场',
            slotName: 'slot3101150001'
        },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: '350,471.42' },
        targetYear: { text: '7,162,370.00' },
        managementRegionId: '3101150001',
        realEnergyGwDataRatio: { text: '96.89%' },
        target: { text: '365,310.00' },
        realEnergyTargetYearRatio: { text: '25.04%' },
        climateName: { text: '夏热冬冷地区' },
        dataQuality: { text: '--' },
        microclimateName: { text: '华东_夏热冬冷' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        projectId: { text: 'Pj3101150001' },
        energyRingRatio: { text: '13.68%' },
        id: '3101150001',
        link: true
    }, {
        gwEndDate: { text: '2020-01-31 00:00:00' },
        realEnergyTargetRatio: { text: '98.60%' },
        energyPerSquare: { text: '4.06' },
        energySameRatio: { text: '0.55%' },
        realEnergy: {
            text: '414,700.58',
            slotName: 'slot3101170001'
        },
        realEnergyYear: { text: '2,336,715.16' },
        exceedWeekLogNum: { text: [] },
        managementRegionName: {
            text: '上海松江万达广场',
            slotName: 'slot3101170001'
        },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: '396,316.30' },
        targetYear: { text: '7,773,488.13' },
        managementRegionId: '3101170001',
        realEnergyGwDataRatio: { text: '104.64%' },
        target: { text: '420,604.49' },
        realEnergyTargetYearRatio: { text: '30.06%' },
        climateName: { text: '夏热冬冷地区' },
        dataQuality: { text: '--' },
        microclimateName: { text: '华东_夏热冬冷' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        projectId: { text: 'Pj3101170001' },
        energyRingRatio: { text: '-2.90%' },
        id: '3101170001',
        link: true
    }];

const data1 = [
    {
        id: '000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: {
            text: '06:30',
            arrow: { dir: 'down' }
        },
        executeTime: { text: '01:10' },
        dataStatus: {
            text: '异常',
            color: '#f00',
            link: true
        },
        viscosityTemperature: { text: 20 },
        outdoorTemperature: { text: 30 },
        open: true,
        link: true
    },
    {
        id: '001',
        name: { text: '青阳万达广场1' },
        date: { text: '2020.08.11' },
        strategyStatus: {
            text: '未执行',
            dot: '#f76b64'
        },
        strategyTime: {
            text: '06:31',
            arrow: { dir: 'up' }
        },
        executeTime: { text: '01:11' },
        dataStatus: { text: '正常1' },
        viscosityTemperature: { text: 21 },
        outdoorTemperature: { text: 31 }
    },
    {
        id: '002',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: {
            text: '审核中',
            dot: '#14e1c6'
        },
        strategyTime: { text: '06:32' },
        executeTime: { text: '01:12' },
        dataStatus: { text: '正常2' },
        viscosityTemperature: { text: 22 },
        outdoorTemperature: { text: 32 }
    },
    {
        id: '003',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: {
            text: '已审批',
            dot: '#62d256'
        },
        strategyTime: { text: '06:33' },
        executeTime: { text: '01:13' },
        dataStatus: { text: '正常3' },
        viscosityTemperature: { text: 23 },
        outdoorTemperature: { text: 33 }
    },
    {
        id: '004',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: { text: '06:34' },
        executeTime: { text: '01:14' },
        dataStatus: { text: '正常4' },
        viscosityTemperature: { text: 24 },
        outdoorTemperature: { text: 34 }
    }
];
const data0 = [
    {
        id: '000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
        date: { text: '2020.08.10' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: {
            text: '06:30',
            arrow: { dir: 'down' }
        },
        executeTime: { text: '01:10' },
        dataStatus: {
            text: '异常',
            color: '#f00',
            link: true
        },
        viscosityTemperature: { text: 20 },
        outdoorTemperature: { text: 30 },
        // open: true,
        link: true,
        selected: true,
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门',
                    disabled: true
                },
                {
                    id: 'tjgw',
                    name: '添加岗位',
                    disabled: true
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ],
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        },
        children: [
            {
                id: '000-1',
                name: { text: '青阳万达广场0-1' },
                date: { text: '2020.08.10' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' },
                dataStatus: {
                    text: '异常',
                    color: '#f00'
                },
                viscosityTemperature: { text: 20 },
                outdoorTemperature: { text: 30 },
                link: true,
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                },
                children: [
                    {
                        id: '0001-1',
                        name: { text: '青阳万达广场01-1' },
                        date: { text: '2020.08.11' },
                        strategyStatus: {
                            text: '未执行',
                            dot: '#f76b64'
                        },
                        strategyTime: { text: '06:31' },
                        executeTime: { text: '01:11' },
                        dataStatus: { text: '正常1' },
                        viscosityTemperature: { text: 21 },
                        outdoorTemperature: { text: 31 },
                        tools: {
                            data: [
                                {
                                    id: 'tjbm',
                                    name: '添加部门'
                                },
                                {
                                    id: 'tjgw',
                                    name: '添加岗位'
                                },
                                {
                                    id: 'bj',
                                    name: '编辑'
                                },
                                {
                                    id: 'sc',
                                    name: '删除'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: '001-2',
                name: { text: '青阳万达广场1-1' },
                date: { text: '2020.08.11' },
                strategyStatus: {
                    text: '未执行',
                    dot: '#f76b64'
                },
                strategyTime: { text: '06:31' },
                executeTime: { text: '01:11' },
                dataStatus: { text: '正常1' },
                viscosityTemperature: { text: 21 },
                outdoorTemperature: { text: 31 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '002-3',
                name: { text: '青阳万达广场2-1' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '003-4',
                name: { text: '青阳万达广场3-1' },
                date: { text: '2020.08.13' },
                strategyStatus: {
                    text: '已审批',
                    dot: '#62d256'
                },
                strategyTime: { text: '06:33' },
                executeTime: { text: '01:13' },
                dataStatus: { text: '正常3' },
                viscosityTemperature: { text: 23 },
                outdoorTemperature: { text: 33 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '004-5',
                name: { text: '青阳万达广场4-1' },
                date: { text: '2020.08.14' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:34' },
                executeTime: { text: '01:14' },
                dataStatus: { text: '正常4' },
                viscosityTemperature: { text: 24 },
                outdoorTemperature: { text: 34 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '001',
        name: { text: '青阳万达广场1' },
        date: { text: '2020.08.11' },
        strategyStatus: {
            text: '未执行',
            dot: '#f76b64'
        },
        strategyTime: {
            text: '06:31',
            arrow: { dir: 'up' }
        },
        executeTime: { text: '01:11' },
        dataStatus: { text: '正常1' },
        viscosityTemperature: { text: 21 },
        outdoorTemperature: { text: 31 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门'
                },
                {
                    id: 'tjgw',
                    name: '添加岗位'
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ]
        },
        children: [
            {
                id: '001-1',
                name: { text: '青阳万达广场0-1' },
                date: { text: '2020.08.10' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' },
                dataStatus: {
                    text: '异常',
                    color: '#f00'
                },
                viscosityTemperature: { text: 20 },
                outdoorTemperature: { text: 30 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                },
                children: [
                    {
                        id: '00011-1',
                        name: { text: '青阳万达广场01-1' },
                        date: { text: '2020.08.11' },
                        strategyStatus: {
                            text: '未执行',
                            dot: '#f76b64'
                        },
                        strategyTime: { text: '06:31' },
                        executeTime: { text: '01:11' },
                        dataStatus: { text: '正常1' },
                        viscosityTemperature: { text: 21 },
                        outdoorTemperature: { text: 31 },
                        tools: {
                            data: [
                                {
                                    id: 'tjbm',
                                    name: '添加部门'
                                },
                                {
                                    id: 'tjgw',
                                    name: '添加岗位'
                                },
                                {
                                    id: 'bj',
                                    name: '编辑'
                                },
                                {
                                    id: 'sc',
                                    name: '删除'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: '0011-2',
                name: { text: '青阳万达广场1-1' },
                date: { text: '2020.08.11' },
                strategyStatus: {
                    text: '未执行',
                    dot: '#f76b64'
                },
                strategyTime: { text: '06:31' },
                executeTime: { text: '01:11' },
                dataStatus: { text: '正常1' },
                viscosityTemperature: { text: 21 },
                outdoorTemperature: { text: 31 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '0012-3',
                name: { text: '青阳万达广场2-1' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '0013-4',
                name: { text: '青阳万达广场3-1' },
                date: { text: '2020.08.13' },
                strategyStatus: {
                    text: '已审批',
                    dot: '#62d256'
                },
                strategyTime: { text: '06:33' },
                executeTime: { text: '01:13' },
                dataStatus: { text: '正常3' },
                viscosityTemperature: { text: 23 },
                outdoorTemperature: { text: 33 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '0014-5',
                name: { text: '青阳万达广场4-1' },
                date: { text: '2020.08.14' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:34' },
                executeTime: { text: '01:14' },
                dataStatus: { text: '正常4' },
                viscosityTemperature: { text: 24 },
                outdoorTemperature: { text: 34 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '002',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: {
            text: '审核中',
            dot: '#14e1c6'
        },
        strategyTime: { text: '06:32' },
        executeTime: { text: '01:12' },
        dataStatus: { text: '正常2' },
        viscosityTemperature: { text: 22 },
        outdoorTemperature: { text: 32 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门'
                },
                {
                    id: 'tjgw',
                    name: '添加岗位'
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ]
        },
        children: [
            {
                id: '002-1',
                name: { text: '青阳万达广场2-1' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            },
            {
                id: '002-2',
                name: { text: '青阳万达广场2-2' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    data: [
                        {
                            id: 'tjbm',
                            name: '添加部门'
                        },
                        {
                            id: 'tjgw',
                            name: '添加岗位'
                        },
                        {
                            id: 'bj',
                            name: '编辑'
                        },
                        {
                            id: 'sc',
                            name: '删除'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '003',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: {
            text: '已审批',
            dot: '#62d256'
        },
        strategyTime: { text: '06:33' },
        executeTime: { text: '01:13' },
        dataStatus: { text: '正常3' },
        viscosityTemperature: { text: 23 },
        outdoorTemperature: { text: 33 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门'
                },
                {
                    id: 'tjgw',
                    name: '添加岗位'
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ]
        }
    },
    {
        id: '004',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: { text: '06:34' },
        executeTime: { text: '01:14' },
        dataStatus: { text: '正常4' },
        viscosityTemperature: { text: 24 },
        outdoorTemperature: { text: 34 },
        tools: {
            data: [
                {
                    id: 'tjbm',
                    name: '添加部门'
                },
                {
                    id: 'tjgw',
                    name: '添加岗位'
                },
                {
                    id: 'bj',
                    name: '编辑'
                },
                {
                    id: 'sc',
                    name: '删除'
                }
            ]
        }
    }
];
const data = [
    {
        id: '000',
        name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0', color: 'red' },
        date: { text: '2020.08.10' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: {
            text: '06:30',
            arrow: { dir: 'down' }
        },
        executeTime: { text: '01:10' },
        dataStatus: {
            text: '异常',
            color: '#f00',
            link: true
        },
        viscosityTemperature: { text: 20 },
        outdoorTemperature: { text: 30 },
        // open: true,
        link: true,
        selected: true,
        tools: {
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        },
        children: [
            {
                id: '000-1',
                name: { text: '青阳万达广场0-1' },
                date: { text: '2020.08.10' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' },
                dataStatus: {
                    text: '异常',
                    color: '#f00'
                },
                viscosityTemperature: { text: 20 },
                outdoorTemperature: { text: 30 },
                link: true,
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                },
                children: [
                    {
                        id: '0001-1',
                        name: { text: '青阳万达广场01-1' },
                        date: { text: '2020.08.11' },
                        strategyStatus: {
                            text: '未执行',
                            dot: '#f76b64'
                        },
                        strategyTime: { text: '06:31' },
                        executeTime: { text: '01:11' },
                        dataStatus: { text: '正常1' },
                        viscosityTemperature: { text: 21 },
                        outdoorTemperature: { text: 31 },
                        tools: {
                            moreOpen: true,
                            moreId: '',
                            more: [
                                {
                                    id: 'm1',
                                    name: 'more1',
                                    disabled: true
                                },
                                {
                                    id: 'm2',
                                    name: 'more2'
                                },
                                {
                                    id: 'm3',
                                    name: 'more3'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: '001-2',
                name: { text: '青阳万达广场1-1' },
                date: { text: '2020.08.11' },
                strategyStatus: {
                    text: '未执行',
                    dot: '#f76b64'
                },
                strategyTime: { text: '06:31' },
                executeTime: { text: '01:11' },
                dataStatus: { text: '正常1' },
                viscosityTemperature: { text: 21 },
                outdoorTemperature: { text: 31 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '002-3',
                name: { text: '青阳万达广场2-1' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '003-4',
                name: { text: '青阳万达广场3-1' },
                date: { text: '2020.08.13' },
                strategyStatus: {
                    text: '已审批',
                    dot: '#62d256'
                },
                strategyTime: { text: '06:33' },
                executeTime: { text: '01:13' },
                dataStatus: { text: '正常3' },
                viscosityTemperature: { text: 23 },
                outdoorTemperature: { text: 33 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '004-5',
                name: { text: '青阳万达广场4-1' },
                date: { text: '2020.08.14' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:34' },
                executeTime: { text: '01:14' },
                dataStatus: { text: '正常4' },
                viscosityTemperature: { text: 24 },
                outdoorTemperature: { text: 34 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '001',
        name: { text: '青阳万达广场1' },
        date: { text: '2020.08.11' },
        strategyStatus: {
            text: '未执行',
            dot: '#f76b64'
        },
        strategyTime: {
            text: '06:31',
            arrow: { dir: 'up' }
        },
        executeTime: { text: '01:11' },
        dataStatus: { text: '正常1' },
        viscosityTemperature: { text: 21 },
        outdoorTemperature: { text: 31 },
        tools: {
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        },
        children: [
            {
                id: '001-1',
                name: { text: '青阳万达广场0-1' },
                date: { text: '2020.08.10' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:30' },
                executeTime: { text: '01:10' },
                dataStatus: {
                    text: '异常',
                    color: '#f00'
                },
                viscosityTemperature: { text: 20 },
                outdoorTemperature: { text: 30 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                },
                children: [
                    {
                        id: '00011-1',
                        name: { text: '青阳万达广场01-1' },
                        date: { text: '2020.08.11' },
                        strategyStatus: {
                            text: '未执行',
                            dot: '#f76b64'
                        },
                        strategyTime: { text: '06:31' },
                        executeTime: { text: '01:11' },
                        dataStatus: { text: '正常1' },
                        viscosityTemperature: { text: 21 },
                        outdoorTemperature: { text: 31 },
                        tools: {
                            moreOpen: true,
                            moreId: '',
                            more: [
                                {
                                    id: 'm1',
                                    name: 'more1',
                                    disabled: true
                                },
                                {
                                    id: 'm2',
                                    name: 'more2'
                                },
                                {
                                    id: 'm3',
                                    name: 'more3'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                id: '0011-2',
                name: { text: '青阳万达广场1-1' },
                date: { text: '2020.08.11' },
                strategyStatus: {
                    text: '未执行',
                    dot: '#f76b64'
                },
                strategyTime: { text: '06:31' },
                executeTime: { text: '01:11' },
                dataStatus: { text: '正常1' },
                viscosityTemperature: { text: 21 },
                outdoorTemperature: { text: 31 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '0012-3',
                name: { text: '青阳万达广场2-1' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '0013-4',
                name: { text: '青阳万达广场3-1' },
                date: { text: '2020.08.13' },
                strategyStatus: {
                    text: '已审批',
                    dot: '#62d256'
                },
                strategyTime: { text: '06:33' },
                executeTime: { text: '01:13' },
                dataStatus: { text: '正常3' },
                viscosityTemperature: { text: 23 },
                outdoorTemperature: { text: 33 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '0014-5',
                name: { text: '青阳万达广场4-1' },
                date: { text: '2020.08.14' },
                strategyStatus: {
                    text: '已执行',
                    dot: '#4eb1fd'
                },
                strategyTime: { text: '06:34' },
                executeTime: { text: '01:14' },
                dataStatus: { text: '正常4' },
                viscosityTemperature: { text: 24 },
                outdoorTemperature: { text: 34 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '002',
        name: { text: '青阳万达广场2' },
        date: { text: '2020.08.12' },
        strategyStatus: {
            text: '审核中',
            dot: '#14e1c6'
        },
        strategyTime: { text: '06:32' },
        executeTime: { text: '01:12' },
        dataStatus: { text: '正常2' },
        viscosityTemperature: { text: 22 },
        outdoorTemperature: { text: 32 },
        tools: {
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        },
        children: [
            {
                id: '002-1',
                name: { text: '青阳万达广场2-1' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            },
            {
                id: '002-2',
                name: { text: '青阳万达广场2-2' },
                date: { text: '2020.08.12' },
                strategyStatus: {
                    text: '审核中',
                    dot: '#14e1c6'
                },
                strategyTime: { text: '06:32' },
                executeTime: { text: '01:12' },
                dataStatus: { text: '正常2' },
                viscosityTemperature: { text: 22 },
                outdoorTemperature: { text: 32 },
                tools: {
                    moreOpen: true,
                    moreId: '',
                    more: [
                        {
                            id: 'm1',
                            name: 'more1',
                            disabled: true
                        },
                        {
                            id: 'm2',
                            name: 'more2'
                        },
                        {
                            id: 'm3',
                            name: 'more3'
                        }
                    ]
                }
            }
        ]
    },
    {
        id: '003',
        name: { text: '青阳万达广场3' },
        date: { text: '2020.08.13' },
        strategyStatus: {
            text: '已审批',
            dot: '#62d256'
        },
        strategyTime: { text: '06:33' },
        executeTime: { text: '01:13' },
        dataStatus: { text: '正常3' },
        viscosityTemperature: { text: 23 },
        outdoorTemperature: { text: 33 },
        tools: {
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    },
    {
        id: '004',
        name: { text: '青阳万达广场4' },
        date: { text: '2020.08.14' },
        strategyStatus: {
            text: '已执行',
            dot: '#4eb1fd'
        },
        strategyTime: { text: '06:34' },
        executeTime: { text: '01:14' },
        dataStatus: { text: '正常4' },
        viscosityTemperature: { text: 24 },
        outdoorTemperature: { text: 34 },
        tools: {
            moreOpen: true,
            moreId: '',
            more: [
                {
                    id: 'm1',
                    name: 'more1',
                    disabled: true
                },
                {
                    id: 'm2',
                    name: 'more2'
                },
                {
                    id: 'm3',
                    name: 'more3'
                }
            ]
        }
    }
];

const rowTools = {
    open: false, // 开启显示操作
    // fixed: 'right', // 与header数据的fixed一样
    width: 380, // 与header数据的width一样

    align: '', // 与header数据的align一样
    text: '', // 头部显示的文字，默认是操作
    moreOpen: true,
    event: 'rowToolHandle'
};
const topButton = [
    {
        id: 'btn0',
        text: '删除',
        type: 'default',
        event: 'topButtonHandle'
    },
    {
        id: 'btn1',
        text: '下载',
        type: 'primary',
        event: 'topButtonHandle'
    }
];

const dataSelect = [
    {
        id: 'test1',
        name: '选择项'
    },
    {
        id: 'test2',
        name: '单平米'
    },
    {
        id: 'test3',
        name: '下级分项'
    },
    {
        id: 'test4',
        name: '滑动平均滑动平均'
    }
];
const statistics = {
    open: true,
    id: 'statistics-id',
    name: { text: '50' },
    date: { text: '2020.08.11' },
    strategyStatus: {
        text: '未执行',
        dot: '#f76b64'
    },
    strategyTime: { text: '06:31' },
    executeTime: { text: '01:11' },
    dataStatus: { text: '正常1' },
    viscosityTemperature: { text: 21 },
    outdoorTemperature: { text: 31 }
};

const header5 = [
    {
        text: '管理分区',
        dataIndex: 'managementRegionName',
        key: 'managementRegionName',
        show: true,
        isOrder: false,
        width: 240,
        disabled: true,
        fixed: 'left',
        sort: { status: '' },
        checked: 'checked'
    }, {
        text: '实际能耗 (kWh)',
        dataIndex: 'realEnergy',
        key: 'realEnergy',
        show: true,
        sort: {
            open: true,
            event: 'sortHandle',
            status: 'ord',
            type: 'number'
        },
        width: 200,
        disabled: true,
        align: 'right',
        checked: 'checked'
    }, {
        text: '单平米能耗 (kWh/m²)',
        dataIndex: 'energyPerSquare',
        key: 'energyPerSquare',
        show: false,
        isOrder: true,
        width: 180,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked',
        disabled: false
    }, {
        text: '管控值(1.01-1.31) (kWh)',
        dataIndex: 'gwData',
        key: 'gwData',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            status: '',
            closeDefault: false,
            event: 'sortHandle',
            open: true,
            type: 'number'
        },
        checked: 'checked',
        disabled: false
    }, {
        text: '实际能耗占管控值比',
        dataIndex: 'realEnergyGwDataRatio',
        key: 'realEnergyGwDataRatio',
        show: true,
        isOrder: true,
        width: 180,
        align: 'right',
        sort: {
            status: '',
            closeDefault: false,
            event: 'sortHandle',
            open: true,
            type: 'number'
        },
        checked: 'checked',
        disabled: false
    }, {
        text: '目标值 (kWh)',
        dataIndex: 'target',
        key: 'target',
        show: false,
        isOrder: true,
        width: 140,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck',
        disabled: false
    }, {
        text: '实际能耗占目标值比',
        dataIndex: 'realEnergyTargetRatio',
        key: 'realEnergyTargetRatio',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        show: false,
        isOrder: true,
        width: 200,
        align: 'right',
        checked: 'uncheck',
        disabled: false
    }, {
        text: '能耗同比',
        dataIndex: 'energySameRatio',
        key: 'energySameRatio',
        msg: '能耗同比',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            status: '',
            closeDefault: false,
            event: 'sortHandle',
            open: true,
            type: 'number'
        },
        checked: 'checked',
        disabled: false
    }, {
        text: '能耗环比',
        dataIndex: 'energyRingRatio',
        key: 'energyRingRatio',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked',
        disabled: false
    }, {
        text: '超标周数',
        dataIndex: 'exceedWeekLogNum',
        key: 'exceedWeekLogNum',
        show: true,
        isOrder: false,
        width: 150,
        align: 'right',
        checked: 'uncheck',
        sort: { status: '' },
        disabled: false
    }, {
        text: '已填写周报数',
        dataIndex: 'fillWeekLogNum',
        key: 'fillWeekLogNum',
        show: true,
        isOrder: false,
        width: 170,
        align: 'right',
        checked: 'uncheck',
        sort: { status: '' },
        disabled: false
    }, {
        text: '年累计实际能耗 (kWh)',
        dataIndex: 'realEnergyYear',
        key: 'realEnergyYear',
        show: false,
        isOrder: true,
        width: 250,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck',
        disabled: false
    }, {
        text: '年总定额 (kWh)',
        dataIndex: 'targetYear',
        key: 'targetYear',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck',
        disabled: false
    }, {
        text: '年实际能耗占年总定额比',
        dataIndex: 'realEnergyTargetYearRatio',
        key: 'realEnergyTargetYearRatio',
        show: false,
        isOrder: true,
        width: 300,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck',
        disabled: false
    }
];

const data5 = [
    {
        gwEndDate: { text: '2020-01-31 00:00:00' },
        realEnergyTargetRatio: { text: 86.72299852206584 },
        energyPerSquare: { text: 4.022562570586545 },
        energySameRatio: { text: -3.213828166317103 },
        realEnergy: { text: 12576433.655271947 },
        realEnergyYear: { text: 65273899.648681596 },
        exceedWeekLogNum: {
            text: [{
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-01 00:00:00',
                end: '2020-01-07 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-01 00:00:00',
                end: '2020-01-07 00:00:00'
            }, {
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-01 00:00:00',
                end: '2020-01-07 00:00:00'
            }, {
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }]
        },
        managementRegionName: { text: '华东运营中心' },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: 13706135.64666402 },
        targetYear: { text: 234155791.52612007 },
        managementRegionId: '11ab3681a4a44fdc87902b5ccc99c4ab',
        realEnergyGwDataRatio: { text: 91.75769144188331 },
        target: { text: 14501843.651164798 },
        realEnergyTargetYearRatio: { text: 27.876269565342053 },
        managementDimension: 0,
        fillWeekLogNum: { text: [] },
        sonList: [
            {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 86.93278099782695 },
                energyPerSquare: { text: 4.1248120572619005 },
                energySameRatio: { text: 11.519689372783045 },
                realEnergy: { text: 3343929.068045475 },
                realEnergyYear: { text: 18941441.914847218 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '上海区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3593844.5859398097 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '上海江桥万达广场',
                        partitionProjectId: '3101140001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海金山万达广场',
                        partitionProjectId: '3101160001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海周浦万达广场',
                        partitionProjectId: '3101150001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海浦江万达广场',
                        partitionProjectId: '3101120008',
                        type: '0'
                    }, {
                        partitionProjectName: '临沂吾悦广场',
                        partitionProjectId: '3713120003',
                        type: '0'
                    }, {
                        partitionProjectName: '上海闵行颛桥万达广场',
                        partitionProjectId: '3101120001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海青浦万达茂',
                        partitionProjectId: '3101180002',
                        type: '0'
                    }, {
                        partitionProjectName: '上海松江万达广场',
                        partitionProjectId: '3101170001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海五角场万达广场',
                        partitionProjectId: '2016060001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海宝山万达广场',
                        partitionProjectId: '3101130001',
                        type: '0'
                    }]
                },
                targetYear: { text: 67991286.65472779 },
                managementRegionId: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
                realEnergyGwDataRatio: { text: 93.04601209323079 },
                target: { text: 3846568.61274122 },
                realEnergyTargetYearRatio: { text: 27.858631372921845 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -4.992906178762517 },
                id: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 82.1777058874645 },
                energyPerSquare: { text: 4.088604639772879 },
                energySameRatio: { text: -8.869344987499074 },
                realEnergy: { text: 4524482.3557221005 },
                realEnergyYear: { text: 22550558.75558959 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '南京区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 5220586.20070768 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '盐城万达广场',
                        partitionProjectId: '3209030001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京建邺万达广场',
                        partitionProjectId: '3201050001',
                        type: '0'
                    }, {
                        partitionProjectName: '泰州万达广场',
                        partitionProjectId: '3212020001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京溧水万达广场',
                        partitionProjectId: '3201240001',
                        type: '0'
                    }, {
                        partitionProjectName: '泰州泰兴万达广场',
                        partitionProjectId: '3212830001',
                        type: '0'
                    }, {
                        partitionProjectName: '镇江万达广场',
                        partitionProjectId: '3211020001',
                        type: '0'
                    }, {
                        partitionProjectName: '连云港万达广场',
                        partitionProjectId: '3207000001',
                        type: '0'
                    }, {
                        partitionProjectName: '淮安楚州万达广场',
                        partitionProjectId: '3208120003',
                        type: '0'
                    }, {
                        partitionProjectName: '南京江宁万达广场',
                        partitionProjectId: '3201150001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京仙林万达茂',
                        partitionProjectId: '3201130002',
                        type: '0'
                    }, {
                        partitionProjectName: '徐州铜山万达广场',
                        partitionProjectId: '3203120001',
                        type: '0'
                    }, {
                        partitionProjectName: '宿迁沭阳万达广场',
                        partitionProjectId: '3213220001',
                        type: '0'
                    }, {
                        partitionProjectName: '徐州万达广场',
                        partitionProjectId: '3203040001',
                        type: '0'
                    }]
                },
                targetYear: { text: 81536235.25951888 },
                managementRegionId: '3776c82df2b843b3b41e18813c06bc60',
                realEnergyGwDataRatio: { text: 86.66617467419236 },
                target: { text: 5505729.69500755 },
                realEnergyTargetYearRatio: { text: 27.657100777113623 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 4.7438231287107415 },
                id: '3776c82df2b843b3b41e18813c06bc60',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 91.42597875215978 },
                energyPerSquare: { text: 3.9002232698498154 },
                energySameRatio: { text: -5.40008335449618 },
                realEnergy: { text: 4708022.231504372 },
                realEnergyYear: { text: 23781898.978244793 },
                exceedWeekLogNum: {
                    text: [{
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }]
                },
                managementRegionName: { text: '无锡区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 4891704.86001653 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '无锡惠山万达广场',
                        partitionProjectId: '3202060001',
                        type: '0'
                    }, {
                        partitionProjectName: '常州新北万达广场',
                        partitionProjectId: '3204110001',
                        type: '0'
                    }, {
                        partitionProjectName: '南通万达广场',
                        partitionProjectId: '3206010001',
                        type: '0'
                    }, {
                        partitionProjectName: '常熟万达广场',
                        partitionProjectId: '3205810001',
                        type: '0'
                    }, {
                        partitionProjectName: '常州溧阳万达广场',
                        partitionProjectId: '3204810001',
                        type: '0'
                    }, {
                        partitionProjectName: '苏州吴中万达广场',
                        partitionProjectId: '3205060001',
                        type: '0'
                    }, {
                        partitionProjectName: '苏州平江万达广场',
                        partitionProjectId: '3205080001',
                        type: '0'
                    }, {
                        partitionProjectName: '无锡江阴万达广场',
                        partitionProjectId: '3202810001',
                        type: '0'
                    }, {
                        partitionProjectName: '江苏太仓万达广场',
                        partitionProjectId: '3205850001',
                        type: '0'
                    }, {
                        partitionProjectName: '南通通州万达广场',
                        partitionProjectId: '3206120001',
                        type: '0'
                    }, {
                        partitionProjectName: '无锡滨湖万达广场',
                        partitionProjectId: '2140000005',
                        type: '0'
                    }, {
                        partitionProjectName: '张家港万达广场',
                        partitionProjectId: '3205820003',
                        type: '0'
                    }, {
                        partitionProjectName: '宜兴万达广场',
                        partitionProjectId: '3202820001',
                        type: '0'
                    }, {
                        partitionProjectName: '昆山万达广场',
                        partitionProjectId: '3205830001',
                        type: '0'
                    }]
                },
                targetYear: { text: 84628269.6118734 },
                managementRegionId: '37888084775848ffbf323220c0ef87bc',
                realEnergyGwDataRatio: { text: 96.24501817324406 },
                target: { text: 5149545.34341603 },
                realEnergyTargetYearRatio: { text: 28.101601376602147 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 0.4919818126667118 },
                id: '37888084775848ffbf323220c0ef87bc',
                link: true
            }],
        energyRingRatio: { text: 0.6309085335955928 },
        id: '11ab3681a4a44fdc87902b5ccc99c4ab',
        link: true,
        children: [{
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 91.42597875215978 },
            energyPerSquare: { text: 3.9002232698498154 },
            energySameRatio: { text: -5.40008335449618 },
            realEnergy: { text: 4708022.231504372 },
            realEnergyYear: { text: 23781898.978244793 },
            exceedWeekLogNum: {
                text: [{
                    start: '2020-01-08 00:00:00',
                    end: '2020-01-14 00:00:00'
                }, {
                    start: '2020-01-15 00:00:00',
                    end: '2020-01-21 00:00:00'
                }, {
                    start: '2020-01-08 00:00:00',
                    end: '2020-01-14 00:00:00'
                }, {
                    start: '2020-01-01 00:00:00',
                    end: '2020-01-07 00:00:00'
                }, {
                    start: '2020-01-15 00:00:00',
                    end: '2020-01-21 00:00:00'
                }, {
                    start: '2020-01-01 00:00:00',
                    end: '2020-01-07 00:00:00'
                }, {
                    start: '2020-01-08 00:00:00',
                    end: '2020-01-14 00:00:00'
                }, {
                    start: '2020-01-15 00:00:00',
                    end: '2020-01-21 00:00:00'
                }, {
                    start: '2020-01-01 00:00:00',
                    end: '2020-01-07 00:00:00'
                }, {
                    start: '2020-01-08 00:00:00',
                    end: '2020-01-14 00:00:00'
                }, {
                    start: '2020-01-15 00:00:00',
                    end: '2020-01-21 00:00:00'
                }, {
                    start: '2020-01-15 00:00:00',
                    end: '2020-01-21 00:00:00'
                }]
            },
            managementRegionName: { text: '无锡区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 4891704.86001653 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '无锡惠山万达广场',
                    partitionProjectId: '3202060001',
                    type: '0'
                }, {
                    partitionProjectName: '常州新北万达广场',
                    partitionProjectId: '3204110001',
                    type: '0'
                }, {
                    partitionProjectName: '南通万达广场',
                    partitionProjectId: '3206010001',
                    type: '0'
                }, {
                    partitionProjectName: '常熟万达广场',
                    partitionProjectId: '3205810001',
                    type: '0'
                }, {
                    partitionProjectName: '常州溧阳万达广场',
                    partitionProjectId: '3204810001',
                    type: '0'
                }, {
                    partitionProjectName: '苏州吴中万达广场',
                    partitionProjectId: '3205060001',
                    type: '0'
                }, {
                    partitionProjectName: '苏州平江万达广场',
                    partitionProjectId: '3205080001',
                    type: '0'
                }, {
                    partitionProjectName: '无锡江阴万达广场',
                    partitionProjectId: '3202810001',
                    type: '0'
                }, {
                    partitionProjectName: '江苏太仓万达广场',
                    partitionProjectId: '3205850001',
                    type: '0'
                }, {
                    partitionProjectName: '南通通州万达广场',
                    partitionProjectId: '3206120001',
                    type: '0'
                }, {
                    partitionProjectName: '无锡滨湖万达广场',
                    partitionProjectId: '2140000005',
                    type: '0'
                }, {
                    partitionProjectName: '张家港万达广场',
                    partitionProjectId: '3205820003',
                    type: '0'
                }, {
                    partitionProjectName: '宜兴万达广场',
                    partitionProjectId: '3202820001',
                    type: '0'
                }, {
                    partitionProjectName: '昆山万达广场',
                    partitionProjectId: '3205830001',
                    type: '0'
                }]
            },
            targetYear: { text: 84628269.6118734 },
            managementRegionId: '37888084775848ffbf323220c0ef87bc',
            realEnergyGwDataRatio: { text: 96.24501817324406 },
            target: { text: 5149545.34341603 },
            realEnergyTargetYearRatio: { text: 28.101601376602147 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: 0.4919818126667118 },
            id: '37888084775848ffbf323220c0ef87bc',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 82.1777058874645 },
            energyPerSquare: { text: 4.088604639772879 },
            energySameRatio: { text: -8.869344987499074 },
            realEnergy: { text: 4524482.3557221005 },
            realEnergyYear: { text: 22550558.75558959 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '南京区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 5220586.20070768 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '盐城万达广场',
                    partitionProjectId: '3209030001',
                    type: '0'
                }, {
                    partitionProjectName: '南京建邺万达广场',
                    partitionProjectId: '3201050001',
                    type: '0'
                }, {
                    partitionProjectName: '泰州万达广场',
                    partitionProjectId: '3212020001',
                    type: '0'
                }, {
                    partitionProjectName: '南京溧水万达广场',
                    partitionProjectId: '3201240001',
                    type: '0'
                }, {
                    partitionProjectName: '泰州泰兴万达广场',
                    partitionProjectId: '3212830001',
                    type: '0'
                }, {
                    partitionProjectName: '镇江万达广场',
                    partitionProjectId: '3211020001',
                    type: '0'
                }, {
                    partitionProjectName: '连云港万达广场',
                    partitionProjectId: '3207000001',
                    type: '0'
                }, {
                    partitionProjectName: '淮安楚州万达广场',
                    partitionProjectId: '3208120003',
                    type: '0'
                }, {
                    partitionProjectName: '南京江宁万达广场',
                    partitionProjectId: '3201150001',
                    type: '0'
                }, {
                    partitionProjectName: '南京仙林万达茂',
                    partitionProjectId: '3201130002',
                    type: '0'
                }, {
                    partitionProjectName: '徐州铜山万达广场',
                    partitionProjectId: '3203120001',
                    type: '0'
                }, {
                    partitionProjectName: '宿迁沭阳万达广场',
                    partitionProjectId: '3213220001',
                    type: '0'
                }, {
                    partitionProjectName: '徐州万达广场',
                    partitionProjectId: '3203040001',
                    type: '0'
                }]
            },
            targetYear: { text: 81536235.25951888 },
            managementRegionId: '3776c82df2b843b3b41e18813c06bc60',
            realEnergyGwDataRatio: { text: 86.66617467419236 },
            target: { text: 5505729.69500755 },
            realEnergyTargetYearRatio: { text: 27.657100777113623 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: 4.7438231287107415 },
            id: '3776c82df2b843b3b41e18813c06bc60',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 86.93278099782695 },
            energyPerSquare: { text: 4.1248120572619005 },
            energySameRatio: { text: 11.519689372783045 },
            realEnergy: { text: 3343929.068045475 },
            realEnergyYear: { text: 18941441.914847218 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '上海区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 3593844.5859398097 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '上海江桥万达广场',
                    partitionProjectId: '3101140001',
                    type: '0'
                }, {
                    partitionProjectName: '上海金山万达广场',
                    partitionProjectId: '3101160001',
                    type: '0'
                }, {
                    partitionProjectName: '上海周浦万达广场',
                    partitionProjectId: '3101150001',
                    type: '0'
                }, {
                    partitionProjectName: '上海浦江万达广场',
                    partitionProjectId: '3101120008',
                    type: '0'
                }, {
                    partitionProjectName: '临沂吾悦广场',
                    partitionProjectId: '3713120003',
                    type: '0'
                }, {
                    partitionProjectName: '上海闵行颛桥万达广场',
                    partitionProjectId: '3101120001',
                    type: '0'
                }, {
                    partitionProjectName: '上海青浦万达茂',
                    partitionProjectId: '3101180002',
                    type: '0'
                }, {
                    partitionProjectName: '上海松江万达广场',
                    partitionProjectId: '3101170001',
                    type: '0'
                }, {
                    partitionProjectName: '上海五角场万达广场',
                    partitionProjectId: '2016060001',
                    type: '0'
                }, {
                    partitionProjectName: '上海宝山万达广场',
                    partitionProjectId: '3101130001',
                    type: '0'
                }]
            },
            targetYear: { text: 67991286.65472779 },
            managementRegionId: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
            realEnergyGwDataRatio: { text: 93.04601209323079 },
            target: { text: 3846568.61274122 },
            realEnergyTargetYearRatio: { text: 27.858631372921845 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -4.992906178762517 },
            id: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
            link: true
        }]
    }, {
        gwEndDate: { text: '2020-01-31 00:00:00' },
        realEnergyTargetRatio: { text: 87.6060467766029 },
        energyPerSquare: { text: 3.701997585886322 },
        energySameRatio: { text: -7.278731690287371 },
        realEnergy: { text: 10171900.04687546 },
        realEnergyYear: { text: -6.43783923615e+32 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '东南运营中心' },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: 11105080.396487191 },
        targetYear: { text: 221678229.61530888 },
        managementRegionId: '31136406b54a414cace218b02f10c867',
        realEnergyGwDataRatio: { text: 91.59681590502561 },
        target: { text: 11610956.57336759 },
        realEnergyTargetYearRatio: { text: -2.9041368867488507e+26 },
        managementDimension: 0,
        fillWeekLogNum: { text: [] },
        sonList: [{
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 90.7991495505851 },
            energyPerSquare: { text: 4.419931229191843 },
            energySameRatio: { text: -4.492254111122329 },
            realEnergy: { text: 3156265.595905717 },
            realEnergyYear: { text: 19601129.8800558 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '厦门区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 3434144.2015556004 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '漳州台商区万达广场',
                    partitionProjectId: '3506810001',
                    type: '0'
                }, {
                    partitionProjectName: '漳州碧湖万达广场',
                    partitionProjectId: '3506020001',
                    type: '0'
                }, {
                    partitionProjectName: '泉州安溪万达广场',
                    partitionProjectId: '3505240001',
                    type: '0'
                }, {
                    partitionProjectName: '厦门湖里万达广场',
                    partitionProjectId: '3502060001',
                    type: '0'
                }, {
                    partitionProjectName: '龙岩万达广场',
                    partitionProjectId: '3508010001',
                    type: '0'
                }, {
                    partitionProjectName: '泉州浦西万达广场',
                    partitionProjectId: '3505030001',
                    type: '0'
                }, {
                    partitionProjectName: '泉州星光耀万达广场',
                    partitionProjectId: '3505030002',
                    type: '0'
                }, {
                    partitionProjectName: '厦门集美万达广场',
                    partitionProjectId: '3502110001',
                    type: '0'
                }, {
                    partitionProjectName: '晋江万达广场',
                    partitionProjectId: '3503020001',
                    type: '0'
                }]
            },
            targetYear: { text: 69132754.98816453 },
            managementRegionId: '495ab87334cb4f5aa4fb54d8636b0225',
            realEnergyGwDataRatio: { text: 91.90835942404487 },
            target: { text: 3476095.9893653304 },
            realEnergyTargetYearRatio: { text: 28.352884075589778 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -15.003895128401979 },
            id: '495ab87334cb4f5aa4fb54d8636b0225',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 83.2288027914421 },
            energyPerSquare: { text: 3.2848184730695307 },
            energySameRatio: { text: -13.328833637247527 },
            realEnergy: { text: 3089997.160910432 },
            realEnergyYear: { text: 17730061.99967772 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '宁波区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 3508907.0593276396 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '余姚万达广场',
                    partitionProjectId: '3302810001',
                    type: '0'
                }, {
                    partitionProjectName: '宁波江北万达广场',
                    partitionProjectId: '3302050001',
                    type: '0'
                }, {
                    partitionProjectName: '温州龙湾万达广场',
                    partitionProjectId: '3303030001',
                    type: '0'
                }, {
                    partitionProjectName: '衢州万达广场',
                    partitionProjectId: '3308020001',
                    type: '0'
                }, {
                    partitionProjectName: '宁波鄞州万达广场',
                    partitionProjectId: '3302120001',
                    type: '0'
                }, {
                    partitionProjectName: '金华万达广场',
                    partitionProjectId: '3307020001',
                    type: '0'
                }, {
                    partitionProjectName: '台州经开万达广场',
                    partitionProjectId: '3310000001',
                    type: '0'
                }, {
                    partitionProjectName: '温州平阳万达广场',
                    partitionProjectId: '3254010001',
                    type: '0'
                }, {
                    partitionProjectName: '宁波奉化万达广场',
                    partitionProjectId: '3302830001',
                    type: '0'
                }, {
                    partitionProjectName: '义乌万达广场',
                    partitionProjectId: '3307820001',
                    type: '0'
                }]
            },
            targetYear: { text: 65991640.38554349 },
            managementRegionId: '347b0c84025c4e5badf07b6246dbeb6b',
            realEnergyGwDataRatio: { text: 88.06152766846218 },
            target: { text: 3712653.6214313507 },
            realEnergyTargetYearRatio: { text: 26.867133315815817 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: 2.115631004057091 },
            id: '347b0c84025c4e5badf07b6246dbeb6b',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 86.73551511456263 },
            energyPerSquare: { text: 3.278541959976738 },
            energySameRatio: { text: -8.33693923281787 },
            realEnergy: { text: 2043764.7039039265 },
            realEnergyYear: { text: 11470186.289918054 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '杭州区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 2230829.16927991 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '绍兴柯桥万达广场',
                    partitionProjectId: '3306210001',
                    type: '0'
                }, {
                    partitionProjectName: '嘉兴南湖万达广场',
                    partitionProjectId: '3304010001',
                    type: '0'
                }, {
                    partitionProjectName: '绍兴上虞万达广场',
                    partitionProjectId: '3306820001',
                    type: '0'
                }, {
                    partitionProjectName: '杭州余杭万达广场',
                    partitionProjectId: '3301100001',
                    type: '0'
                }, {
                    partitionProjectName: '杭州拱墅万达广场',
                    partitionProjectId: '3301050001',
                    type: '0'
                }, {
                    partitionProjectName: '湖州万达广场',
                    partitionProjectId: '3305020001',
                    type: '0'
                }, {
                    partitionProjectName: '嘉兴龙鼎万达广场',
                    partitionProjectId: '3304990001',
                    type: '0'
                }]
            },
            targetYear: { text: 42725944.478667565 },
            managementRegionId: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
            realEnergyGwDataRatio: { text: 91.614576859941 },
            target: { text: 2356318.171633 },
            realEnergyTargetYearRatio: { text: 26.845951399962498 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -3.5184315032133373 },
            id: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 91.09263743577493 },
            energyPerSquare: { text: 3.8144272058505417 },
            energySameRatio: { text: -2.1753270685979933 },
            realEnergy: { text: 1881872.5861553848 },
            realEnergyYear: { text: -6.43783923615e+32 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '福州区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 1931199.9663240397 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '福清万达广场',
                    partitionProjectId: '3501810001',
                    type: '0'
                }, {
                    partitionProjectName: '福州金融街万达广场',
                    partitionProjectId: '3501030001',
                    type: '0'
                }, {
                    partitionProjectName: '宁德万达广场',
                    partitionProjectId: '3509010001',
                    type: '0'
                }, {
                    partitionProjectName: '福建三明万达广场',
                    partitionProjectId: '3650000001',
                    type: '0'
                }, {
                    partitionProjectName: '福州仓山万达广场',
                    partitionProjectId: '3501040001',
                    type: '0'
                }, {
                    partitionProjectName: '莆田万达广场',
                    partitionProjectId: '3505820001',
                    type: '0'
                }]
            },
            targetYear: { text: 43827889.762933314 },
            managementRegionId: '14ebbf62109f48368f47a751e152c06b',
            realEnergyGwDataRatio: { text: 97.44576527398415 },
            target: { text: 2065888.79093791 },
            realEnergyTargetYearRatio: { text: -1.4688909894983565e+27 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -13.85242714018958 },
            id: '14ebbf62109f48368f47a751e152c06b',
            link: true
        }],
        energyRingRatio: { text: -8.39648286796988 },
        id: '31136406b54a414cace218b02f10c867',
        link: true,
        children: [{
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 90.7991495505851 },
            energyPerSquare: { text: 4.419931229191843 },
            energySameRatio: { text: -4.492254111122329 },
            realEnergy: { text: 3156265.595905717 },
            realEnergyYear: { text: 19601129.8800558 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '厦门区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 3434144.2015556004 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '漳州台商区万达广场',
                    partitionProjectId: '3506810001',
                    type: '0'
                }, {
                    partitionProjectName: '漳州碧湖万达广场',
                    partitionProjectId: '3506020001',
                    type: '0'
                }, {
                    partitionProjectName: '泉州安溪万达广场',
                    partitionProjectId: '3505240001',
                    type: '0'
                }, {
                    partitionProjectName: '厦门湖里万达广场',
                    partitionProjectId: '3502060001',
                    type: '0'
                }, {
                    partitionProjectName: '龙岩万达广场',
                    partitionProjectId: '3508010001',
                    type: '0'
                }, {
                    partitionProjectName: '泉州浦西万达广场',
                    partitionProjectId: '3505030001',
                    type: '0'
                }, {
                    partitionProjectName: '泉州星光耀万达广场',
                    partitionProjectId: '3505030002',
                    type: '0'
                }, {
                    partitionProjectName: '厦门集美万达广场',
                    partitionProjectId: '3502110001',
                    type: '0'
                }, {
                    partitionProjectName: '晋江万达广场',
                    partitionProjectId: '3503020001',
                    type: '0'
                }]
            },
            targetYear: { text: 69132754.98816453 },
            managementRegionId: '495ab87334cb4f5aa4fb54d8636b0225',
            realEnergyGwDataRatio: { text: 91.90835942404487 },
            target: { text: 3476095.9893653304 },
            realEnergyTargetYearRatio: { text: 28.352884075589778 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -15.003895128401979 },
            id: '495ab87334cb4f5aa4fb54d8636b0225',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 83.2288027914421 },
            energyPerSquare: { text: 3.2848184730695307 },
            energySameRatio: { text: -13.328833637247527 },
            realEnergy: { text: 3089997.160910432 },
            realEnergyYear: { text: 17730061.99967772 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '宁波区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 3508907.0593276396 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '余姚万达广场',
                    partitionProjectId: '3302810001',
                    type: '0'
                }, {
                    partitionProjectName: '宁波江北万达广场',
                    partitionProjectId: '3302050001',
                    type: '0'
                }, {
                    partitionProjectName: '温州龙湾万达广场',
                    partitionProjectId: '3303030001',
                    type: '0'
                }, {
                    partitionProjectName: '衢州万达广场',
                    partitionProjectId: '3308020001',
                    type: '0'
                }, {
                    partitionProjectName: '宁波鄞州万达广场',
                    partitionProjectId: '3302120001',
                    type: '0'
                }, {
                    partitionProjectName: '金华万达广场',
                    partitionProjectId: '3307020001',
                    type: '0'
                }, {
                    partitionProjectName: '台州经开万达广场',
                    partitionProjectId: '3310000001',
                    type: '0'
                }, {
                    partitionProjectName: '温州平阳万达广场',
                    partitionProjectId: '3254010001',
                    type: '0'
                }, {
                    partitionProjectName: '宁波奉化万达广场',
                    partitionProjectId: '3302830001',
                    type: '0'
                }, {
                    partitionProjectName: '义乌万达广场',
                    partitionProjectId: '3307820001',
                    type: '0'
                }]
            },
            targetYear: { text: 65991640.38554349 },
            managementRegionId: '347b0c84025c4e5badf07b6246dbeb6b',
            realEnergyGwDataRatio: { text: 88.06152766846218 },
            target: { text: 3712653.6214313507 },
            realEnergyTargetYearRatio: { text: 26.867133315815817 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: 2.115631004057091 },
            id: '347b0c84025c4e5badf07b6246dbeb6b',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 86.73551511456263 },
            energyPerSquare: { text: 3.278541959976738 },
            energySameRatio: { text: -8.33693923281787 },
            realEnergy: { text: 2043764.7039039265 },
            realEnergyYear: { text: 11470186.289918054 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '杭州区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 2230829.16927991 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '绍兴柯桥万达广场',
                    partitionProjectId: '3306210001',
                    type: '0'
                }, {
                    partitionProjectName: '嘉兴南湖万达广场',
                    partitionProjectId: '3304010001',
                    type: '0'
                }, {
                    partitionProjectName: '绍兴上虞万达广场',
                    partitionProjectId: '3306820001',
                    type: '0'
                }, {
                    partitionProjectName: '杭州余杭万达广场',
                    partitionProjectId: '3301100001',
                    type: '0'
                }, {
                    partitionProjectName: '杭州拱墅万达广场',
                    partitionProjectId: '3301050001',
                    type: '0'
                }, {
                    partitionProjectName: '湖州万达广场',
                    partitionProjectId: '3305020001',
                    type: '0'
                }, {
                    partitionProjectName: '嘉兴龙鼎万达广场',
                    partitionProjectId: '3304990001',
                    type: '0'
                }]
            },
            targetYear: { text: 42725944.478667565 },
            managementRegionId: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
            realEnergyGwDataRatio: { text: 91.614576859941 },
            target: { text: 2356318.171633 },
            realEnergyTargetYearRatio: { text: 26.845951399962498 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -3.5184315032133373 },
            id: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
            link: true
        }, {
            gwEndDate: { text: '2020-01-31 00:00:00' },
            realEnergyTargetRatio: { text: 91.09263743577493 },
            energyPerSquare: { text: 3.8144272058505417 },
            energySameRatio: { text: -2.1753270685979933 },
            realEnergy: { text: 1881872.5861553848 },
            realEnergyYear: { text: -6.43783923615e+32 },
            exceedWeekLogNum: { text: [] },
            managementRegionName: { text: '福州区域' },
            gwStartDate: { text: '2020-01-01 00:00:00' },
            gwData: { text: 1931199.9663240397 },
            managementRegionMap: {
                text: [{
                    partitionProjectName: '福清万达广场',
                    partitionProjectId: '3501810001',
                    type: '0'
                }, {
                    partitionProjectName: '福州金融街万达广场',
                    partitionProjectId: '3501030001',
                    type: '0'
                }, {
                    partitionProjectName: '宁德万达广场',
                    partitionProjectId: '3509010001',
                    type: '0'
                }, {
                    partitionProjectName: '福建三明万达广场',
                    partitionProjectId: '3650000001',
                    type: '0'
                }, {
                    partitionProjectName: '福州仓山万达广场',
                    partitionProjectId: '3501040001',
                    type: '0'
                }, {
                    partitionProjectName: '莆田万达广场',
                    partitionProjectId: '3505820001',
                    type: '0'
                }]
            },
            targetYear: { text: 43827889.762933314 },
            managementRegionId: '14ebbf62109f48368f47a751e152c06b',
            realEnergyGwDataRatio: { text: 97.44576527398415 },
            target: { text: 2065888.79093791 },
            realEnergyTargetYearRatio: { text: -1.4688909894983565e+27 },
            managementDimension: 1,
            fillWeekLogNum: { text: [] },
            energyRingRatio: { text: -13.85242714018958 },
            id: '14ebbf62109f48368f47a751e152c06b',
            link: true
        }]
    }
];
const data52 = [
    {
        gwEndDate: { text: '2020-01-15 00:00:00' },
        realEnergyTargetRatio: { text: 86.72299852206584 },
        energyPerSquare: { text: 4.022562570586545 },
        energySameRatio: { text: -3.213828166317103 },
        realEnergy: { text: 12576433.655271947 },
        realEnergyYear: { text: 65273899.648681596 },
        exceedWeekLogNum: {
            text: [{
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-01 00:00:00',
                end: '2020-01-07 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-01 00:00:00',
                end: '2020-01-07 00:00:00'
            }, {
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-01 00:00:00',
                end: '2020-01-07 00:00:00'
            }, {
                start: '2020-01-08 00:00:00',
                end: '2020-01-14 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }, {
                start: '2020-01-15 00:00:00',
                end: '2020-01-21 00:00:00'
            }]
        },
        managementRegionName: { text: '华东运营中心' },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: 13706135.64666402 },
        targetYear: { text: 234155791.52612007 },
        managementRegionId: '11ab3681a4a44fdc87902b5ccc99c4ab',
        realEnergyGwDataRatio: { text: 91.75769144188331 },
        target: { text: 14501843.651164798 },
        realEnergyTargetYearRatio: { text: 27.876269565342053 },
        managementDimension: 0,
        fillWeekLogNum: { text: [] },
        sonList: [
            {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 86.93278099782695 },
                energyPerSquare: { text: 4.1248120572619005 },
                energySameRatio: { text: 11.519689372783045 },
                realEnergy: { text: 3343929.068045475 },
                realEnergyYear: { text: 18941441.914847218 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '上海区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3593844.5859398097 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '上海江桥万达广场',
                        partitionProjectId: '3101140001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海金山万达广场',
                        partitionProjectId: '3101160001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海周浦万达广场',
                        partitionProjectId: '3101150001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海浦江万达广场',
                        partitionProjectId: '3101120008',
                        type: '0'
                    }, {
                        partitionProjectName: '临沂吾悦广场',
                        partitionProjectId: '3713120003',
                        type: '0'
                    }, {
                        partitionProjectName: '上海闵行颛桥万达广场',
                        partitionProjectId: '3101120001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海青浦万达茂',
                        partitionProjectId: '3101180002',
                        type: '0'
                    }, {
                        partitionProjectName: '上海松江万达广场',
                        partitionProjectId: '3101170001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海五角场万达广场',
                        partitionProjectId: '2016060001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海宝山万达广场',
                        partitionProjectId: '3101130001',
                        type: '0'
                    }]
                },
                targetYear: { text: 67991286.65472779 },
                managementRegionId: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
                realEnergyGwDataRatio: { text: 93.04601209323079 },
                target: { text: 3846568.61274122 },
                realEnergyTargetYearRatio: { text: 27.858631372921845 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -4.992906178762517 },
                id: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 82.1777058874645 },
                energyPerSquare: { text: 4.088604639772879 },
                energySameRatio: { text: -8.869344987499074 },
                realEnergy: { text: 4524482.3557221005 },
                realEnergyYear: { text: 22550558.75558959 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '南京区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 5220586.20070768 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '盐城万达广场',
                        partitionProjectId: '3209030001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京建邺万达广场',
                        partitionProjectId: '3201050001',
                        type: '0'
                    }, {
                        partitionProjectName: '泰州万达广场',
                        partitionProjectId: '3212020001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京溧水万达广场',
                        partitionProjectId: '3201240001',
                        type: '0'
                    }, {
                        partitionProjectName: '泰州泰兴万达广场',
                        partitionProjectId: '3212830001',
                        type: '0'
                    }, {
                        partitionProjectName: '镇江万达广场',
                        partitionProjectId: '3211020001',
                        type: '0'
                    }, {
                        partitionProjectName: '连云港万达广场',
                        partitionProjectId: '3207000001',
                        type: '0'
                    }, {
                        partitionProjectName: '淮安楚州万达广场',
                        partitionProjectId: '3208120003',
                        type: '0'
                    }, {
                        partitionProjectName: '南京江宁万达广场',
                        partitionProjectId: '3201150001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京仙林万达茂',
                        partitionProjectId: '3201130002',
                        type: '0'
                    }, {
                        partitionProjectName: '徐州铜山万达广场',
                        partitionProjectId: '3203120001',
                        type: '0'
                    }, {
                        partitionProjectName: '宿迁沭阳万达广场',
                        partitionProjectId: '3213220001',
                        type: '0'
                    }, {
                        partitionProjectName: '徐州万达广场',
                        partitionProjectId: '3203040001',
                        type: '0'
                    }]
                },
                targetYear: { text: 81536235.25951888 },
                managementRegionId: '3776c82df2b843b3b41e18813c06bc60',
                realEnergyGwDataRatio: { text: 86.66617467419236 },
                target: { text: 5505729.69500755 },
                realEnergyTargetYearRatio: { text: 27.657100777113623 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 4.7438231287107415 },
                id: '3776c82df2b843b3b41e18813c06bc60',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 91.42597875215978 },
                energyPerSquare: { text: 3.9002232698498154 },
                energySameRatio: { text: -5.40008335449618 },
                realEnergy: { text: 4708022.231504372 },
                realEnergyYear: { text: 23781898.978244793 },
                exceedWeekLogNum: {
                    text: [{
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }]
                },
                managementRegionName: { text: '无锡区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 4891704.86001653 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '无锡惠山万达广场',
                        partitionProjectId: '3202060001',
                        type: '0'
                    }, {
                        partitionProjectName: '常州新北万达广场',
                        partitionProjectId: '3204110001',
                        type: '0'
                    }, {
                        partitionProjectName: '南通万达广场',
                        partitionProjectId: '3206010001',
                        type: '0'
                    }, {
                        partitionProjectName: '常熟万达广场',
                        partitionProjectId: '3205810001',
                        type: '0'
                    }, {
                        partitionProjectName: '常州溧阳万达广场',
                        partitionProjectId: '3204810001',
                        type: '0'
                    }, {
                        partitionProjectName: '苏州吴中万达广场',
                        partitionProjectId: '3205060001',
                        type: '0'
                    }, {
                        partitionProjectName: '苏州平江万达广场',
                        partitionProjectId: '3205080001',
                        type: '0'
                    }, {
                        partitionProjectName: '无锡江阴万达广场',
                        partitionProjectId: '3202810001',
                        type: '0'
                    }, {
                        partitionProjectName: '江苏太仓万达广场',
                        partitionProjectId: '3205850001',
                        type: '0'
                    }, {
                        partitionProjectName: '南通通州万达广场',
                        partitionProjectId: '3206120001',
                        type: '0'
                    }, {
                        partitionProjectName: '无锡滨湖万达广场',
                        partitionProjectId: '2140000005',
                        type: '0'
                    }, {
                        partitionProjectName: '张家港万达广场',
                        partitionProjectId: '3205820003',
                        type: '0'
                    }, {
                        partitionProjectName: '宜兴万达广场',
                        partitionProjectId: '3202820001',
                        type: '0'
                    }, {
                        partitionProjectName: '昆山万达广场',
                        partitionProjectId: '3205830001',
                        type: '0'
                    }]
                },
                targetYear: { text: 84628269.6118734 },
                managementRegionId: '37888084775848ffbf323220c0ef87bc',
                realEnergyGwDataRatio: { text: 96.24501817324406 },
                target: { text: 5149545.34341603 },
                realEnergyTargetYearRatio: { text: 28.101601376602147 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 0.4919818126667118 },
                id: '37888084775848ffbf323220c0ef87bc',
                link: true
            }],
        energyRingRatio: { text: 0.6309085335955928 },
        id: '11ab3681a4a44fdc87902b5ccc99c4ab',
        link: true,
        children: [
            {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 91.42597875215978 },
                energyPerSquare: { text: 3.9002232698498154 },
                energySameRatio: { text: -5.40008335449618 },
                realEnergy: { text: 4708022.231504372 },
                realEnergyYear: { text: 23781898.978244793 },
                exceedWeekLogNum: {
                    text: [{
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-01 00:00:00',
                        end: '2020-01-07 00:00:00'
                    }, {
                        start: '2020-01-08 00:00:00',
                        end: '2020-01-14 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }, {
                        start: '2020-01-15 00:00:00',
                        end: '2020-01-21 00:00:00'
                    }]
                },
                managementRegionName: { text: '无锡区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 4891704.86001653 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '无锡惠山万达广场',
                        partitionProjectId: '3202060001',
                        type: '0'
                    }, {
                        partitionProjectName: '常州新北万达广场',
                        partitionProjectId: '3204110001',
                        type: '0'
                    }, {
                        partitionProjectName: '南通万达广场',
                        partitionProjectId: '3206010001',
                        type: '0'
                    }, {
                        partitionProjectName: '常熟万达广场',
                        partitionProjectId: '3205810001',
                        type: '0'
                    }, {
                        partitionProjectName: '常州溧阳万达广场',
                        partitionProjectId: '3204810001',
                        type: '0'
                    }, {
                        partitionProjectName: '苏州吴中万达广场',
                        partitionProjectId: '3205060001',
                        type: '0'
                    }, {
                        partitionProjectName: '苏州平江万达广场',
                        partitionProjectId: '3205080001',
                        type: '0'
                    }, {
                        partitionProjectName: '无锡江阴万达广场',
                        partitionProjectId: '3202810001',
                        type: '0'
                    }, {
                        partitionProjectName: '江苏太仓万达广场',
                        partitionProjectId: '3205850001',
                        type: '0'
                    }, {
                        partitionProjectName: '南通通州万达广场',
                        partitionProjectId: '3206120001',
                        type: '0'
                    }, {
                        partitionProjectName: '无锡滨湖万达广场',
                        partitionProjectId: '2140000005',
                        type: '0'
                    }, {
                        partitionProjectName: '张家港万达广场',
                        partitionProjectId: '3205820003',
                        type: '0'
                    }, {
                        partitionProjectName: '宜兴万达广场',
                        partitionProjectId: '3202820001',
                        type: '0'
                    }, {
                        partitionProjectName: '昆山万达广场',
                        partitionProjectId: '3205830001',
                        type: '0'
                    }]
                },
                targetYear: { text: 84628269.6118734 },
                managementRegionId: '37888084775848ffbf323220c0ef87bc',
                realEnergyGwDataRatio: { text: 96.24501817324406 },
                target: { text: 5149545.34341603 },
                realEnergyTargetYearRatio: { text: 28.101601376602147 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 0.4919818126667118 },
                id: '37888084775848ffbf323220c0ef87bc',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 82.1777058874645 },
                energyPerSquare: { text: 4.088604639772879 },
                energySameRatio: { text: -8.869344987499074 },
                realEnergy: { text: 4524482.3557221005 },
                realEnergyYear: { text: 22550558.75558959 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '南京区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 5220586.20070768 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '盐城万达广场',
                        partitionProjectId: '3209030001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京建邺万达广场',
                        partitionProjectId: '3201050001',
                        type: '0'
                    }, {
                        partitionProjectName: '泰州万达广场',
                        partitionProjectId: '3212020001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京溧水万达广场',
                        partitionProjectId: '3201240001',
                        type: '0'
                    }, {
                        partitionProjectName: '泰州泰兴万达广场',
                        partitionProjectId: '3212830001',
                        type: '0'
                    }, {
                        partitionProjectName: '镇江万达广场',
                        partitionProjectId: '3211020001',
                        type: '0'
                    }, {
                        partitionProjectName: '连云港万达广场',
                        partitionProjectId: '3207000001',
                        type: '0'
                    }, {
                        partitionProjectName: '淮安楚州万达广场',
                        partitionProjectId: '3208120003',
                        type: '0'
                    }, {
                        partitionProjectName: '南京江宁万达广场',
                        partitionProjectId: '3201150001',
                        type: '0'
                    }, {
                        partitionProjectName: '南京仙林万达茂',
                        partitionProjectId: '3201130002',
                        type: '0'
                    }, {
                        partitionProjectName: '徐州铜山万达广场',
                        partitionProjectId: '3203120001',
                        type: '0'
                    }, {
                        partitionProjectName: '宿迁沭阳万达广场',
                        partitionProjectId: '3213220001',
                        type: '0'
                    }, {
                        partitionProjectName: '徐州万达广场',
                        partitionProjectId: '3203040001',
                        type: '0'
                    }]
                },
                targetYear: { text: 81536235.25951888 },
                managementRegionId: '3776c82df2b843b3b41e18813c06bc60',
                realEnergyGwDataRatio: { text: 86.66617467419236 },
                target: { text: 5505729.69500755 },
                realEnergyTargetYearRatio: { text: 27.657100777113623 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 4.7438231287107415 },
                id: '3776c82df2b843b3b41e18813c06bc60',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 86.93278099782695 },
                energyPerSquare: { text: 4.1248120572619005 },
                energySameRatio: { text: 11.519689372783045 },
                realEnergy: { text: 3343929.068045475 },
                realEnergyYear: { text: 18941441.914847218 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '上海区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3593844.5859398097 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '上海江桥万达广场',
                        partitionProjectId: '3101140001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海金山万达广场',
                        partitionProjectId: '3101160001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海周浦万达广场',
                        partitionProjectId: '3101150001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海浦江万达广场',
                        partitionProjectId: '3101120008',
                        type: '0'
                    }, {
                        partitionProjectName: '临沂吾悦广场',
                        partitionProjectId: '3713120003',
                        type: '0'
                    }, {
                        partitionProjectName: '上海闵行颛桥万达广场',
                        partitionProjectId: '3101120001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海青浦万达茂',
                        partitionProjectId: '3101180002',
                        type: '0'
                    }, {
                        partitionProjectName: '上海松江万达广场',
                        partitionProjectId: '3101170001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海五角场万达广场',
                        partitionProjectId: '2016060001',
                        type: '0'
                    }, {
                        partitionProjectName: '上海宝山万达广场',
                        partitionProjectId: '3101130001',
                        type: '0'
                    }]
                },
                targetYear: { text: 67991286.65472779 },
                managementRegionId: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
                realEnergyGwDataRatio: { text: 93.04601209323079 },
                target: { text: 3846568.61274122 },
                realEnergyTargetYearRatio: { text: 27.858631372921845 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -4.992906178762517 },
                id: '0686bc7b3d494dd1a9c86dc1cbaaea7e',
                link: true
            }]
    }, {
        gwEndDate: { text: '2020-01-03 00:00:00' },
        realEnergyTargetRatio: { text: 87.6060467766029 },
        energyPerSquare: { text: 3.701997585886322 },
        energySameRatio: { text: -7.278731690287371 },
        realEnergy: { text: 10171900.04687546 },
        realEnergyYear: { text: -6.43783923615e+32 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '东南运营中心' },
        gwStartDate: { text: '2020-01-01 00:00:00' },
        gwData: { text: 11105080.396487191 },
        targetYear: { text: 221678229.61530888 },
        managementRegionId: '31136406b54a414cace218b02f10c867',
        realEnergyGwDataRatio: { text: 91.59681590502561 },
        target: { text: 11610956.57336759 },
        realEnergyTargetYearRatio: { text: -2.9041368867488507e+26 },
        managementDimension: 0,
        fillWeekLogNum: { text: [] },
        sonList: [
            {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 90.7991495505851 },
                energyPerSquare: { text: 4.419931229191843 },
                energySameRatio: { text: -4.492254111122329 },
                realEnergy: { text: 3156265.595905717 },
                realEnergyYear: { text: 19601129.8800558 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '厦门区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3434144.2015556004 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '漳州台商区万达广场',
                        partitionProjectId: '3506810001',
                        type: '0'
                    }, {
                        partitionProjectName: '漳州碧湖万达广场',
                        partitionProjectId: '3506020001',
                        type: '0'
                    }, {
                        partitionProjectName: '泉州安溪万达广场',
                        partitionProjectId: '3505240001',
                        type: '0'
                    }, {
                        partitionProjectName: '厦门湖里万达广场',
                        partitionProjectId: '3502060001',
                        type: '0'
                    }, {
                        partitionProjectName: '龙岩万达广场',
                        partitionProjectId: '3508010001',
                        type: '0'
                    }, {
                        partitionProjectName: '泉州浦西万达广场',
                        partitionProjectId: '3505030001',
                        type: '0'
                    }, {
                        partitionProjectName: '泉州星光耀万达广场',
                        partitionProjectId: '3505030002',
                        type: '0'
                    }, {
                        partitionProjectName: '厦门集美万达广场',
                        partitionProjectId: '3502110001',
                        type: '0'
                    }, {
                        partitionProjectName: '晋江万达广场',
                        partitionProjectId: '3503020001',
                        type: '0'
                    }]
                },
                targetYear: { text: 69132754.98816453 },
                managementRegionId: '495ab87334cb4f5aa4fb54d8636b0225',
                realEnergyGwDataRatio: { text: 91.90835942404487 },
                target: { text: 3476095.9893653304 },
                realEnergyTargetYearRatio: { text: 28.352884075589778 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -15.003895128401979 },
                id: '495ab87334cb4f5aa4fb54d8636b0225',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 83.2288027914421 },
                energyPerSquare: { text: 3.2848184730695307 },
                energySameRatio: { text: -13.328833637247527 },
                realEnergy: { text: 3089997.160910432 },
                realEnergyYear: { text: 17730061.99967772 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '宁波区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3508907.0593276396 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '余姚万达广场',
                        partitionProjectId: '3302810001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁波江北万达广场',
                        partitionProjectId: '3302050001',
                        type: '0'
                    }, {
                        partitionProjectName: '温州龙湾万达广场',
                        partitionProjectId: '3303030001',
                        type: '0'
                    }, {
                        partitionProjectName: '衢州万达广场',
                        partitionProjectId: '3308020001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁波鄞州万达广场',
                        partitionProjectId: '3302120001',
                        type: '0'
                    }, {
                        partitionProjectName: '金华万达广场',
                        partitionProjectId: '3307020001',
                        type: '0'
                    }, {
                        partitionProjectName: '台州经开万达广场',
                        partitionProjectId: '3310000001',
                        type: '0'
                    }, {
                        partitionProjectName: '温州平阳万达广场',
                        partitionProjectId: '3254010001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁波奉化万达广场',
                        partitionProjectId: '3302830001',
                        type: '0'
                    }, {
                        partitionProjectName: '义乌万达广场',
                        partitionProjectId: '3307820001',
                        type: '0'
                    }]
                },
                targetYear: { text: 65991640.38554349 },
                managementRegionId: '347b0c84025c4e5badf07b6246dbeb6b',
                realEnergyGwDataRatio: { text: 88.06152766846218 },
                target: { text: 3712653.6214313507 },
                realEnergyTargetYearRatio: { text: 26.867133315815817 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 2.115631004057091 },
                id: '347b0c84025c4e5badf07b6246dbeb6b',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 86.73551511456263 },
                energyPerSquare: { text: 3.278541959976738 },
                energySameRatio: { text: -8.33693923281787 },
                realEnergy: { text: 2043764.7039039265 },
                realEnergyYear: { text: 11470186.289918054 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '杭州区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 2230829.16927991 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '绍兴柯桥万达广场',
                        partitionProjectId: '3306210001',
                        type: '0'
                    }, {
                        partitionProjectName: '嘉兴南湖万达广场',
                        partitionProjectId: '3304010001',
                        type: '0'
                    }, {
                        partitionProjectName: '绍兴上虞万达广场',
                        partitionProjectId: '3306820001',
                        type: '0'
                    }, {
                        partitionProjectName: '杭州余杭万达广场',
                        partitionProjectId: '3301100001',
                        type: '0'
                    }, {
                        partitionProjectName: '杭州拱墅万达广场',
                        partitionProjectId: '3301050001',
                        type: '0'
                    }, {
                        partitionProjectName: '湖州万达广场',
                        partitionProjectId: '3305020001',
                        type: '0'
                    }, {
                        partitionProjectName: '嘉兴龙鼎万达广场',
                        partitionProjectId: '3304990001',
                        type: '0'
                    }]
                },
                targetYear: { text: 42725944.478667565 },
                managementRegionId: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
                realEnergyGwDataRatio: { text: 91.614576859941 },
                target: { text: 2356318.171633 },
                realEnergyTargetYearRatio: { text: 26.845951399962498 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -3.5184315032133373 },
                id: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 91.09263743577493 },
                energyPerSquare: { text: 3.8144272058505417 },
                energySameRatio: { text: -2.1753270685979933 },
                realEnergy: { text: 1881872.5861553848 },
                realEnergyYear: { text: -6.43783923615e+32 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '福州区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 1931199.9663240397 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '福清万达广场',
                        partitionProjectId: '3501810001',
                        type: '0'
                    }, {
                        partitionProjectName: '福州金融街万达广场',
                        partitionProjectId: '3501030001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁德万达广场',
                        partitionProjectId: '3509010001',
                        type: '0'
                    }, {
                        partitionProjectName: '福建三明万达广场',
                        partitionProjectId: '3650000001',
                        type: '0'
                    }, {
                        partitionProjectName: '福州仓山万达广场',
                        partitionProjectId: '3501040001',
                        type: '0'
                    }, {
                        partitionProjectName: '莆田万达广场',
                        partitionProjectId: '3505820001',
                        type: '0'
                    }]
                },
                targetYear: { text: 43827889.762933314 },
                managementRegionId: '14ebbf62109f48368f47a751e152c06b',
                realEnergyGwDataRatio: { text: 97.44576527398415 },
                target: { text: 2065888.79093791 },
                realEnergyTargetYearRatio: { text: -1.4688909894983565e+27 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -13.85242714018958 },
                id: '14ebbf62109f48368f47a751e152c06b',
                link: true
            }
        ],
        energyRingRatio: { text: -8.39648286796988 },
        id: '31136406b54a414cace218b02f10c867',
        link: true,
        children: [
            {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 90.7991495505851 },
                energyPerSquare: { text: 4.419931229191843 },
                energySameRatio: { text: -4.492254111122329 },
                realEnergy: { text: 3156265.595905717 },
                realEnergyYear: { text: 19601129.8800558 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '厦门区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3434144.2015556004 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '漳州台商区万达广场',
                        partitionProjectId: '3506810001',
                        type: '0'
                    }, {
                        partitionProjectName: '漳州碧湖万达广场',
                        partitionProjectId: '3506020001',
                        type: '0'
                    }, {
                        partitionProjectName: '泉州安溪万达广场',
                        partitionProjectId: '3505240001',
                        type: '0'
                    }, {
                        partitionProjectName: '厦门湖里万达广场',
                        partitionProjectId: '3502060001',
                        type: '0'
                    }, {
                        partitionProjectName: '龙岩万达广场',
                        partitionProjectId: '3508010001',
                        type: '0'
                    }, {
                        partitionProjectName: '泉州浦西万达广场',
                        partitionProjectId: '3505030001',
                        type: '0'
                    }, {
                        partitionProjectName: '泉州星光耀万达广场',
                        partitionProjectId: '3505030002',
                        type: '0'
                    }, {
                        partitionProjectName: '厦门集美万达广场',
                        partitionProjectId: '3502110001',
                        type: '0'
                    }, {
                        partitionProjectName: '晋江万达广场',
                        partitionProjectId: '3503020001',
                        type: '0'
                    }]
                },
                targetYear: { text: 69132754.98816453 },
                managementRegionId: '495ab87334cb4f5aa4fb54d8636b0225',
                realEnergyGwDataRatio: { text: 91.90835942404487 },
                target: { text: 3476095.9893653304 },
                realEnergyTargetYearRatio: { text: 28.352884075589778 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -15.003895128401979 },
                id: '495ab87334cb4f5aa4fb54d8636b0225',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 83.2288027914421 },
                energyPerSquare: { text: 3.2848184730695307 },
                energySameRatio: { text: -13.328833637247527 },
                realEnergy: { text: 3089997.160910432 },
                realEnergyYear: { text: 17730061.99967772 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '宁波区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 3508907.0593276396 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '余姚万达广场',
                        partitionProjectId: '3302810001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁波江北万达广场',
                        partitionProjectId: '3302050001',
                        type: '0'
                    }, {
                        partitionProjectName: '温州龙湾万达广场',
                        partitionProjectId: '3303030001',
                        type: '0'
                    }, {
                        partitionProjectName: '衢州万达广场',
                        partitionProjectId: '3308020001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁波鄞州万达广场',
                        partitionProjectId: '3302120001',
                        type: '0'
                    }, {
                        partitionProjectName: '金华万达广场',
                        partitionProjectId: '3307020001',
                        type: '0'
                    }, {
                        partitionProjectName: '台州经开万达广场',
                        partitionProjectId: '3310000001',
                        type: '0'
                    }, {
                        partitionProjectName: '温州平阳万达广场',
                        partitionProjectId: '3254010001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁波奉化万达广场',
                        partitionProjectId: '3302830001',
                        type: '0'
                    }, {
                        partitionProjectName: '义乌万达广场',
                        partitionProjectId: '3307820001',
                        type: '0'
                    }]
                },
                targetYear: { text: 65991640.38554349 },
                managementRegionId: '347b0c84025c4e5badf07b6246dbeb6b',
                realEnergyGwDataRatio: { text: 88.06152766846218 },
                target: { text: 3712653.6214313507 },
                realEnergyTargetYearRatio: { text: 26.867133315815817 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: 2.115631004057091 },
                id: '347b0c84025c4e5badf07b6246dbeb6b',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 86.73551511456263 },
                energyPerSquare: { text: 3.278541959976738 },
                energySameRatio: { text: -8.33693923281787 },
                realEnergy: { text: 2043764.7039039265 },
                realEnergyYear: { text: 11470186.289918054 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '杭州区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 2230829.16927991 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '绍兴柯桥万达广场',
                        partitionProjectId: '3306210001',
                        type: '0'
                    }, {
                        partitionProjectName: '嘉兴南湖万达广场',
                        partitionProjectId: '3304010001',
                        type: '0'
                    }, {
                        partitionProjectName: '绍兴上虞万达广场',
                        partitionProjectId: '3306820001',
                        type: '0'
                    }, {
                        partitionProjectName: '杭州余杭万达广场',
                        partitionProjectId: '3301100001',
                        type: '0'
                    }, {
                        partitionProjectName: '杭州拱墅万达广场',
                        partitionProjectId: '3301050001',
                        type: '0'
                    }, {
                        partitionProjectName: '湖州万达广场',
                        partitionProjectId: '3305020001',
                        type: '0'
                    }, {
                        partitionProjectName: '嘉兴龙鼎万达广场',
                        partitionProjectId: '3304990001',
                        type: '0'
                    }]
                },
                targetYear: { text: 42725944.478667565 },
                managementRegionId: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
                realEnergyGwDataRatio: { text: 91.614576859941 },
                target: { text: 2356318.171633 },
                realEnergyTargetYearRatio: { text: 26.845951399962498 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -3.5184315032133373 },
                id: 'c52dd8d3782d4c8d9c0c0676460f7f6d',
                link: true
            }, {
                gwEndDate: { text: '2020-01-31 00:00:00' },
                realEnergyTargetRatio: { text: 91.09263743577493 },
                energyPerSquare: { text: 3.8144272058505417 },
                energySameRatio: { text: -2.1753270685979933 },
                realEnergy: { text: 1881872.5861553848 },
                realEnergyYear: { text: -6.43783923615e+32 },
                exceedWeekLogNum: { text: [] },
                managementRegionName: { text: '福州区域' },
                gwStartDate: { text: '2020-01-01 00:00:00' },
                gwData: { text: 1931199.9663240397 },
                managementRegionMap: {
                    text: [{
                        partitionProjectName: '福清万达广场',
                        partitionProjectId: '3501810001',
                        type: '0'
                    }, {
                        partitionProjectName: '福州金融街万达广场',
                        partitionProjectId: '3501030001',
                        type: '0'
                    }, {
                        partitionProjectName: '宁德万达广场',
                        partitionProjectId: '3509010001',
                        type: '0'
                    }, {
                        partitionProjectName: '福建三明万达广场',
                        partitionProjectId: '3650000001',
                        type: '0'
                    }, {
                        partitionProjectName: '福州仓山万达广场',
                        partitionProjectId: '3501040001',
                        type: '0'
                    }, {
                        partitionProjectName: '莆田万达广场',
                        partitionProjectId: '3505820001',
                        type: '0'
                    }]
                },
                targetYear: { text: 43827889.762933314 },
                managementRegionId: '14ebbf62109f48368f47a751e152c06b',
                realEnergyGwDataRatio: { text: 97.44576527398415 },
                target: { text: 2065888.79093791 },
                realEnergyTargetYearRatio: { text: -1.4688909894983565e+27 },
                managementDimension: 1,
                fillWeekLogNum: { text: [] },
                energyRingRatio: { text: -13.85242714018958 },
                id: '14ebbf62109f48368f47a751e152c06b',
                link: true
            }]
    }
];

const header6 = [
    {
        text: '管理分区',
        dataIndex: 'managementRegionName',
        key: 'managementRegionName',
        show: true,
        isOrder: false,
        width: 200,
        disabled: true,
        fixed: 'left',
        sort: { status: '' },
        checked: 'checked'
    }, {
        text: '气候区',
        dataIndex: 'climateName',
        key: 'climateName',
        show: false,
        isOrder: false,
        width: 160,
        disabled: false,
        align: 'left',
        checked: 'uncheck',
        sort: { status: '' }
    }, {
        text: '微气候区',
        dataIndex: 'microclimateName',
        key: 'microclimateName',
        show: false,
        isOrder: false,
        width: 160,
        disabled: false,
        align: 'left',
        checked: 'uncheck',
        sort: { status: '' }
    }, {
        text: '数据质量',
        dataIndex: 'dataQuality',
        key: 'dataQuality',
        show: false,
        isOrder: true,
        width: 140,
        disabled: false,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck'
    }, {
        text: '实际能耗 (kWh)',
        dataIndex: 'realEnergy',
        key: 'realEnergy',
        show: true,
        sort: {
            open: true,
            event: 'sortHandle',
            status: 'ord',
            type: 'number'
        },
        width: 180,
        disabled: true,
        align: 'right',
        checked: 'checked'
    }, {
        text: '单平米能耗 (kWh/m²)',
        dataIndex: 'energyPerSquare',
        key: 'energyPerSquare',
        show: false,
        isOrder: true,
        width: 180,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck'
    }, {
        text: '管控值',
        dataIndex: 'gwData',
        key: 'gwData',
        show: true,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked',
        tip: {
            open: true,
            text: '2020.08.01-2020.08.31'
        }
    }, {
        text: '占管控值比',
        dataIndex: 'realEnergyGwDataRatio',
        key: 'realEnergyGwDataRatio',
        show: true,
        isOrder: true,
        width: 180,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked'
    }, {
        text: '目标值 (kWh)',
        dataIndex: 'target',
        key: 'target',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck',
        tip: {
            open: true,
            text: '2020.08.01-2020.08.31'
        }
    }, {
        text: '占目标值比',
        dataIndex: 'realEnergyTargetRatio',
        key: 'realEnergyTargetRatio',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        show: false,
        isOrder: true,
        width: 200,
        align: 'right',
        checked: 'uncheck'
    }, {
        text: '能耗同比',
        dataIndex: 'energySameRatio',
        key: 'energySameRatio',
        msg: '能耗同比',
        show: true,
        isOrder: true,
        width: 190,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked'
    }, {
        text: '能耗环比',
        dataIndex: 'energyRingRatio',
        key: 'energyRingRatio',
        show: true,
        isOrder: true,
        width: 190,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked'
    }, {
        text: '室外平均温度',
        dataIndex: 'outDoorTempAvg',
        key: 'outDoorTempAvg',
        show: true,
        isOrder: true,
        width: 210,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked',
        tip: {
            open: true,
            text: '室外平均温度=逐日营业时段室外平均温度均值'
        }
    }, {
        text: '温度同比变化',
        dataIndex: 'tempSameRatio',
        key: 'tempSameRatio',
        show: true,
        isOrder: true,
        width: 210,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'checked',
        tip: {
            open: true,
            text: '温度同比变化=当前时段室外平均温度-去年同时段室外平均温度'
        }
    }, {
        text: '超标周数',
        dataIndex: 'exceedWeekLogNum',
        key: 'exceedWeekLogNum',
        show: true,
        isOrder: false,
        width: 150,
        align: 'right',
        checked: 'uncheck',
        sort: { status: '' }
    }, {
        text: '已填写周报数',
        dataIndex: 'fillWeekLogNum',
        key: 'fillWeekLogNum',
        show: true,
        isOrder: false,
        width: 170,
        align: 'right',
        checked: 'uncheck',
        sort: { status: '' }
    }, {
        text: '年累计实际能耗 (kWh)',
        dataIndex: 'realEnergyYear',
        key: 'realEnergyYear',
        show: false,
        isOrder: true,
        width: 250,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck'
    }, {
        text: '年总定额 (kWh)',
        dataIndex: 'targetYear',
        key: 'targetYear',
        show: false,
        isOrder: true,
        width: 200,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck'
    }, {
        text: '年实际能耗占年总定额比',
        dataIndex: 'realEnergyTargetYearRatio',
        key: 'realEnergyTargetYearRatio',
        show: false,
        isOrder: true,
        width: 300,
        align: 'right',
        sort: {
            open: true,
            event: 'sortHandle',
            type: 'number',
            status: ''
        },
        checked: 'uncheck'
    }
];
const data6 = [
    {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 91.68926037879427 },
        energyPerSquare: { text: 6.780426168014196 },
        energySameRatio: { text: null },
        realEnergy: { text: 1267841.241630695 },
        realEnergyYear: { text: 7499127.408911976 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '大庆让胡路万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 1359570.1840130298 },
        targetYear: { text: 12045831.29061762 },
        managementRegionId: '2306040001',
        realEnergyGwDataRatio: { text: 93.25309252431681 },
        target: { text: 1382758.71829796 },
        outDoorTempAvg: { text: 25.596153846153847 },
        realEnergyTargetYearRatio: { text: 62.25495964527556 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 1.7 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 3.2661290322580605 },
        projectId: { text: 'Pj2306040001' },
        energyRingRatio: { text: -9.718250209385195 },
        id: { text: '2306040001' },
        link: { text: true }
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 110.7612302685554 },
        energyPerSquare: { text: 8.231992323011161 },
        energySameRatio: { text: 8.055291274743551 },
        realEnergy: { text: 791259.1020878329 },
        realEnergyYear: { text: 4230156.640900693 },
        exceedWeekLogNum: {
            text: [{
                start: '2020-08-01 00:00:00',
                end: '2020-08-07 00:00:00'
            }, {
                start: '2020-08-08 00:00:00',
                end: '2020-08-14 00:00:00'
            }, {
                start: '2020-08-15 00:00:00',
                end: '2020-08-21 00:00:00'
            }]
        },
        managementRegionName: { text: '哈尔滨哈西万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 686649.79701581 },
        targetYear: { text: 6453999.7712835 },
        managementRegionId: '2301030001',
        realEnergyGwDataRatio: { text: 115.23473909504618 },
        target: { text: 714382.73136667 },
        outDoorTempAvg: { text: 26.442307692307693 },
        realEnergyTargetYearRatio: { text: 65.54317928120172 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 0.9 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 4.869106699751864 },
        projectId: { text: 'Pj2301030001' },
        energyRingRatio: { text: 3.935754528295744 },
        id: { text: '2301030001' },
        link: { text: true },
        islog: true
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 92.84995160362853 },
        energyPerSquare: { text: 7.113240127921909 },
        energySameRatio: { text: -5.937051592864086 },
        realEnergy: { text: 596644.3554498339 },
        realEnergyYear: { text: 4026218.6068410166 },
        exceedWeekLogNum: {
            text: [{
                start: '2020-08-01 00:00:00',
                end: '2020-08-07 00:00:00'
            }]
        },
        managementRegionName: { text: '齐齐哈尔万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 599086.4369103699 },
        targetYear: { text: 7026328.1 },
        managementRegionId: '2302030452',
        realEnergyGwDataRatio: { text: 99.59236575724692 },
        target: { text: 642589.84 },
        outDoorTempAvg: { text: 24.96153846153846 },
        realEnergyTargetYearRatio: { text: 57.301887266565544 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 1.9 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 3.579404466501245 },
        projectId: { text: 'Pj2302030001' },
        energyRingRatio: { text: -8.962231329848724 },
        id: { text: '2302030452' },
        link: { text: true },
        islog: true
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 97.9230097272244 },
        energyPerSquare: { text: 6.411631351049245 },
        energySameRatio: { text: 2.122661061499505 },
        realEnergy: { text: 566788.2114327532 },
        realEnergyYear: { text: 3376540.2550894353 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '大庆萨尔图万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 567290.8542182299 },
        targetYear: { text: 5415243.02030037 },
        managementRegionId: '2306020001',
        realEnergyGwDataRatio: { text: 99.91139593001735 },
        target: { text: 578810.03965422 },
        outDoorTempAvg: { text: 25.596153846153847 },
        realEnergyTargetYearRatio: { text: 62.35251571225232 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 3 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 3.2644747725392875 },
        projectId: { text: 'Pj2306020001' },
        energyRingRatio: { text: -12.96823028413041 },
        id: { text: '2306020001' },
        link: { text: true }
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 93.44172447322686 },
        energyPerSquare: { text: 6.561445309253858 },
        energySameRatio: { text: -6.466457314459655 },
        realEnergy: { text: 523629.5814596949 },
        realEnergyYear: { text: 3152885.4926456553 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '牡丹江万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 553646.7909714299 },
        targetYear: { text: 6004866.63250783 },
        managementRegionId: '2310000001',
        realEnergyGwDataRatio: { text: 94.57827445200816 },
        target: { text: 560380.90522369 },
        outDoorTempAvg: { text: 26.21153846153846 },
        realEnergyTargetYearRatio: { text: 52.50550404528978 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 0.5 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 4.1470223325062 },
        projectId: { text: 'Pj2310050001' },
        energyRingRatio: { text: 13.125213953129453 },
        id: { text: '2310000001' },
        link: { text: true }
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 83.49750885868855 },
        energyPerSquare: { text: 6.17254512014627 },
        energySameRatio: { text: -9.125404682862307 },
        realEnergy: { text: 460471.86596291175 },
        realEnergyYear: { text: 2713099.095840318 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '佳木斯万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 551403.76592926 },
        targetYear: { text: 4690993.51391074 },
        managementRegionId: '2308010001',
        realEnergyGwDataRatio: { text: 83.50901724200158 },
        target: { text: 551479.76539302 },
        outDoorTempAvg: { text: 24.826923076923077 },
        realEnergyTargetYearRatio: { text: 57.83634293662643 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 1 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 4.117245657568233 },
        projectId: { text: 'Pj2308110001' },
        energyRingRatio: { text: -7.705106058908555 },
        id: { text: '2308010001' },
        link: { text: true }
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 89.03645911094114 },
        energyPerSquare: { text: 6.154327167975527 },
        energySameRatio: { text: -6.284593788946431 },
        realEnergy: { text: 425916.3659869143 },
        realEnergyYear: { text: 2463337.3121173084 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '鸡西万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 473406.88820743 },
        targetYear: { text: 4749484.305545 },
        managementRegionId: '2303000001',
        realEnergyGwDataRatio: { text: 89.96834997472469 },
        target: { text: 478361.75229769 },
        outDoorTempAvg: { text: 25.44230769230769 },
        realEnergyTargetYearRatio: { text: 51.86536376678566 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 0.4 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 4.186724565756823 },
        projectId: { text: 'Pj2303020001' },
        energyRingRatio: { text: 3.159844577484081 },
        id: { text: '2303000001' },
        link: { text: true }
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 62.8127486466447 },
        energyPerSquare: { text: 4.278286287221238 },
        energySameRatio: { text: -23.723906434747224 },
        realEnergy: { text: 369216.10658719286 },
        realEnergyYear: { text: 2895790.778835327 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '绥化万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 575759.6455030602 },
        targetYear: { text: 5644373.212 },
        managementRegionId: '2312020001',
        realEnergyGwDataRatio: { text: 64.12677746190367 },
        target: { text: 587804.41 },
        outDoorTempAvg: { text: 25.673076923076923 },
        realEnergyTargetYearRatio: { text: 51.30402739278196 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 11.2 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 4.549007444168733 },
        projectId: { text: 'Pj2312020001' },
        energyRingRatio: { text: -17.717841177764708 },
        id: { text: '2312020001' },
        link: { text: true }
    }, {
        gwEndDate: { text: '2020-08-31 00:00:00' },
        realEnergyTargetRatio: { text: 95.50467255783501 },
        energyPerSquare: { text: 6.324435264153904 },
        energySameRatio: { text: -0.10967211243272902 },
        realEnergy: { text: 241010.31415932416 },
        realEnergyYear: { text: 1394240.3160112042 },
        exceedWeekLogNum: { text: [] },
        managementRegionName: { text: '哈尔滨香坊万达广场' },
        gwStartDate: { text: '2020-08-01 00:00:00' },
        gwData: { text: 248718.26913454 },
        targetYear: { text: 2322888.21280022 },
        managementRegionId: '2301100001',
        realEnergyGwDataRatio: { text: 96.90092931169187 },
        target: { text: 252354.47408437 },
        outDoorTempAvg: { text: 26.442307692307693 },
        realEnergyTargetYearRatio: { text: 60.021842993919215 },
        climateName: { text: '严寒地区' },
        dataQuality: { text: 1.7 },
        microclimateName: { text: '东北_严寒' },
        managementDimension: 2,
        fillWeekLogNum: { text: [] },
        tempSameRatio: { text: 4.87923904052937 },
        projectId: { text: 'Pj2301100001' },
        energyRingRatio: { text: -5.85126990861414 },
        id: { text: '2301100001' },
        link: { text: true }
    }
];

const header7 = [ // checked uncheck
    {
        key: 'Tname',
        text: '支路名称',
        fixed: 'left',
        width: 300,
        checked: 'checked'
    },
    {
        key: 'Ttype',
        text: '支路类型',
        checked: 'checked'
    },
    {
        key: 'TcabinetNumber',
        text: '支路柜号',
        checked: 'checked'
    },
    {
        key: 'TlocalId',
        text: '支路本地编码',
        checked: 'uncheck'
    },
    {
        key: 'Tparent',
        text: '所属上级支路(进线号)',
        checked: 'uncheck'
    },
    {
        key: 'TlineNumber',
        text: '配电箱回路',
        checked: 'uncheck'
    },
    {
        key: 'TdaoZhaLocalId',
        text: '倒闸信息',
        checked: 'uncheck'
    },
    {
        key: 'Tmeter',
        text: '关联仪表',
        checked: 'checked'
    },
    {
        key: 'TmeterFormula',
        text: '仪表公式',
        checked: 'checked'
    },
    {
        key: 'Tratio',
        text: '变比',
        checked: 'checked'
    },
    {
        key: 'TenergyModelItemName',
        text: '能耗模型',
        checked: 'checked'
    },
    {
        key: 'TrelateLast',
        text: '所属末级分项',
        checked: 'checked'
    },
    {
        key: 'TcalculateUnitLocalId',
        text: '计算单元本地编码',
        checked: 'uncheck'
    },
    {
        key: 'TcalculateUnitName',
        text: '计算单元名称',
        checked: 'uncheck'
    },
    {
        key: 'Tcompute',
        text: '是否参与总支计算',
        fixed: 'right',
        checked: 'checked'
    },
    {
        key: 'action',
        text: '操作',
        fixed: 'right',
        width: 100,
        checked: 'checked'
    }
];
const data7 = [];
const data72 = [
    {
        id: 'EI10102003',
        itemName: {
            text: '公区总'
        },
        sameRatio: {
            text: -3.5097138043108584
        },
        realEnergy: {
            text: 162664.39619728125
        },
        regionRatio: {
            text: 9.082340343505676
        },
        controlData: {
            text: 141970.23045495
        },
        ringRatio: {
            text: 16.268982943552235
        },
        microclimateRatio: {
            text: 6.872410978384642
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.15'
        },
        selected: true,
        link: true
    },
    {
        id: 'EI101020101020011',
        itemName: {
            text: '热力站'
        },
        sameRatio: {
            text: null
        },
        realEnergy: {
            text: null
        },
        regionRatio: {
            text: null
        },
        controlData: {
            text: null
        },
        ringRatio: {
            text: null
        },
        microclimateRatio: {
            text: null
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: 'NaN'
        },
        link: true
    },
    {
        id: 'EI101020102040301',
        itemName: {
            text: '分散空调'
        },
        sameRatio: {
            text: null
        },
        realEnergy: {
            text: null
        },
        regionRatio: {
            text: null
        },
        controlData: {
            text: null
        },
        ringRatio: {
            text: null
        },
        microclimateRatio: {
            text: null
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: 'NaN'
        },
        link: true
    },
    {
        id: 'EI101020102056001',
        itemName: {
            text: '热风幕'
        },
        sameRatio: {
            text: -21.059833352084823
        },
        realEnergy: {
            text: 656.4382554817712
        },
        regionRatio: {
            text: 37.08758832503999
        },
        controlData: {
            text: 788.6512995800001
        },
        ringRatio: {
            text: -21.077158630837015
        },
        microclimateRatio: {
            text: -14.925482949555708
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.83'
        },
        link: true
    },
    {
        id: 'EI1010202020102001',
        itemName: {
            text: 'LED屏'
        },
        sameRatio: {
            text: 0.9842017117014238
        },
        realEnergy: {
            text: 765.7733000000007
        },
        regionRatio: {
            text: 1.6091218761680504
        },
        controlData: {
            text: 605.9605044199999
        },
        ringRatio: {
            text: -0.04243676847040006
        },
        microclimateRatio: {
            text: -8.754015430173686
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.26'
        },
        link: true
    },
    {
        id: 'EI1401020301002',
        itemName: {
            text: '送排风机'
        },
        sameRatio: {
            text: -41.841939421201346
        },
        realEnergy: {
            text: 1076.9168143964675
        },
        regionRatio: {
            text: -40.40426621918517
        },
        controlData: {
            text: 2790.7514327
        },
        ringRatio: {
            text: -6.884945968264073
        },
        microclimateRatio: {
            text: -27.723742480604603
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.39'
        },
        link: true
    },
    {
        id: 'EI10102020201001',
        itemName: {
            text: '夜景照明'
        },
        sameRatio: {
            text: 41.156273219807275
        },
        realEnergy: {
            text: 1585.069999999956
        },
        regionRatio: {
            text: -33.36059754267969
        },
        controlData: {
            text: 1156.30750134
        },
        ringRatio: {
            text: 2.3811078775739336
        },
        microclimateRatio: {
            text: -37.73239967063551
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.37'
        },
        link: true
    },
    {
        id: 'EI10102060100323',
        itemName: {
            text: '物业用电'
        },
        sameRatio: {
            text: 8.46434745011645
        },
        realEnergy: {
            text: 2171.7656859357758
        },
        regionRatio: {
            text: -8.453229114083868
        },
        controlData: {
            text: 1925.52740767
        },
        ringRatio: {
            text: 2.9568100076352066
        },
        microclimateRatio: {
            text: -5.657217686955491
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.13'
        },
        link: true
    },
    {
        id: 'EI101020302002',
        itemName: {
            text: '给排水'
        },
        sameRatio: {
            text: -29.3004359103052
        },
        realEnergy: {
            text: 2460.1256146179385
        },
        regionRatio: {
            text: -9.204393867426827
        },
        controlData: {
            text: 5003.0188743
        },
        ringRatio: {
            text: -16.861341353058553
        },
        microclimateRatio: {
            text: -29.935780034994707
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.49'
        },
        link: true
    },
    {
        id: 'EI120102030101001',
        itemName: {
            text: '停车场消防通风'
        },
        sameRatio: {
            text: -19.74374048728695
        },
        realEnergy: {
            text: 2603.7272827242386
        },
        regionRatio: {
            text: 35.73639184233532
        },
        controlData: {
            text: 3589.8328246199994
        },
        ringRatio: {
            text: -4.534798236076525
        },
        microclimateRatio: {
            text: 184.21614366460827
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.73'
        },
        link: true
    },
    {
        id: 'EI10102020300-1',
        itemName: {
            text: '停车场照明'
        },
        sameRatio: {
            text: -32.022123670802976
        },
        realEnergy: {
            text: 2745.047972203792
        },
        regionRatio: {
            text: -56.044661757161364
        },
        controlData: {
            text: 3952.1300682200003
        },
        ringRatio: {
            text: 12.161935003270614
        },
        microclimateRatio: {
            text: -62.552046514910266
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.69'
        },
        link: true
    },
    {
        id: 'EI51010401002',
        itemName: {
            text: '强弱电机房'
        },
        sameRatio: {
            text: -23.645967725032982
        },
        realEnergy: {
            text: 4452.282782059735
        },
        regionRatio: {
            text: -47.411700229272796
        },
        controlData: {
            text: 5423.2242599599995
        },
        ringRatio: {
            text: -1.2932162670460547
        },
        microclimateRatio: {
            text: -56.99339718168467
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.82'
        },
        link: true
    },
    {
        id: 'EI1801020304002',
        itemName: {
            text: '电梯'
        },
        sameRatio: {
            text: -25.36990732189388
        },
        realEnergy: {
            text: 6373.484077187099
        },
        regionRatio: {
            text: -11.011385002466785
        },
        controlData: {
            text: 7481.725661910001
        },
        ringRatio: {
            text: 1.0615100878708306
        },
        microclimateRatio: {
            text: -11.605289576147785
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '0.85'
        },
        link: true
    },
    {
        id: 'EI19010206002',
        itemName: {
            text: '其它用电'
        },
        sameRatio: {
            text: -35.596166163718124
        },
        realEnergy: {
            text: 9458.303254928072
        },
        regionRatio: {
            text: 217.77081129784054
        },
        controlData: {
            text: 3491.6481249299995
        },
        ringRatio: {
            text: -0.8366498537310316
        },
        microclimateRatio: {
            text: 116.68440344911788
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '2.71'
        },
        link: true
    },
    {
        id: 'EI01101020102002',
        itemName: {
            text: '空调末端'
        },
        sameRatio: {
            text: -2.4644123715124695
        },
        realEnergy: {
            text: 15906.475554927903
        },
        regionRatio: {
            text: 26.319441658116443
        },
        controlData: {
            text: 12865.18521131
        },
        ringRatio: {
            text: 6.375273823241557
        },
        microclimateRatio: {
            text: 18.890047177609542
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.24'
        },
        link: true
    },
    {
        id: 'EI96101020201002',
        itemName: {
            text: '室内公共照明'
        },
        sameRatio: {
            text: 61.980037509237484
        },
        realEnergy: {
            text: 36821.58352126275
        },
        regionRatio: {
            text: 32.294761893228305
        },
        controlData: {
            text: 23612.623544770002
        },
        ringRatio: {
            text: 88.62488975218461
        },
        microclimateRatio: {
            text: 24.74611521752081
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.56'
        },
        link: true
    },
    {
        id: 'EI101020103101002',
        itemName: {
            text: '冷冻站'
        },
        sameRatio: {
            text: -9.100078572384076
        },
        realEnergy: {
            text: 75587.40208155579
        },
        regionRatio: {
            text: 6.470724607289076
        },
        controlData: {
            text: 69283.64373922
        },
        ringRatio: {
            text: 7.173356278390622
        },
        microclimateRatio: {
            text: 5.463185498254215
        },
        targetValue: {
            text: 25.245444
        },
        targetValueRatio: {
            text: 15.6355
        },
        practicalProportionControl: {
            text: '1.09'
        },
        link: true
    }
];

const header8 = [
    {
        code: 0,
        name: '管理分区',
        checked: 'checked',
        paramName: 'name',
        key: 'name',
        text: '管理分区',
        disabled: true,
        screen: {
            open: true,
            status: 'multipleSearch',
            data: [{
                id: 'd42603790dc64d45afc61971a76e36bf',
                name: '北京区域'
            }, {
                id: '3be3e6cb3cae4797b3d3a40e20cdd5cf',
                name: '东莞区域'
            }, {
                id: 'ae818614efe6406f95e82f027f0e598e',
                name: '南宁区域'
            }],
            event: 'manageListChange'
        },
        width: 200
    }, {
        code: 6,
        name: '空间数量',
        checked: 'uncheck',
        paramName: 'spaceNum',
        key: 'spaceNum',
        text: '空间数量(个)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }, {
        code: 7,
        name: '点位数量',
        checked: 'checked',
        paramName: 'ptNum',
        key: 'ptNum',
        text: '点位数量(个)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }, {
        code: 8,
        name: '环境达标率',
        checked: 'checked',
        paramName: 'envStandardRate',
        key: 'envStandardRate',
        text: '环境达标率(%)',
        sort: {
            open: true,
            event: 'sortHandle',
            status: 'ord',
            type: 'number'
        },
        width: 234
    }, {
        code: 9,
        name: '报警次数',
        checked: 'checked',
        paramName: 'alarmCount',
        key: 'alarmCount',
        text: '报警次数(次)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }, {
        code: 10,
        name: '报警时长',
        checked: 'checked',
        paramName: 'alarmHour',
        key: 'alarmHour',
        text: '报警时长(小时)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }, {
        code: 11,
        name: '转单次数',
        checked: 'checked',
        paramName: 'transferOrderCount',
        key: 'transferOrderCount',
        text: '转单次数(次)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }, {
        code: 12,
        name: '处理完成次数',
        checked: 'checked',
        paramName: 'handleCount',
        key: 'handleCount',
        text: '处理完成次数(次)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }, {
        code: 13,
        name: '忽略次数',
        checked: 'checked',
        paramName: 'ignoreCount',
        key: 'ignoreCount',
        text: '忽略次数(次)',
        sort: {
            open: true,
            event: 'sortHandle'
        },
        width: 234
    }
];
const data8 = [
    {
        id: 'asfasf',
        name: { text: '东莞区域' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: '0' },
        spaceNum: { text: '0' },
        envStandardRate: { text: '--' },
        alarmCount: { text: '0' },
        alarmHour: { text: '0' },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: true,
        children: [{
            id: 'Pj4413030001',
            name: { text: '惠州大亚湾万达广场' },
            businessTime: { text: '--' },
            industrial: { text: '商场' },
            ptNum: { text: '0' },
            spaceNum: { text: '0' },
            envStandardRate: { text: '--' },
            alarmCount: { text: '0' },
            alarmHour: { text: '0' },
            transferOrderCount: { text: '0' },
            handleCount: { text: '0' },
            ignoreCount: { text: '0' },
            link: true
        }]
    }, {
        id: 'asf',
        name: { text: '北京区域' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: 57 },
        spaceNum: { text: 48 },
        envStandardRate: { text: 0 },
        alarmCount: { text: 30 },
        alarmHour: { text: '32.5' },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: true,
        children: [{
            id: 'Pj1101080253',
            name: { text: '博锐尚格北京总部' },
            businessTime: { text: '--' },
            industrial: { text: '商场' },
            ptNum: { text: 57 },
            spaceNum: { text: 48 },
            envStandardRate: { text: 0 },
            alarmCount: { text: 30 },
            alarmHour: { text: '32.5' },
            transferOrderCount: { text: '0' },
            handleCount: { text: '0' },
            ignoreCount: { text: '0' },
            link: true
        }]
    }, {
        id: 'erwterwt',
        name: { text: '南宁区域' },
        businessTime: { text: '--' },
        industrial: { text: '--' },
        ptNum: { text: '0' },
        spaceNum: { text: '0' },
        envStandardRate: { text: '--' },
        alarmCount: { text: '0' },
        alarmHour: { text: '0' },
        transferOrderCount: { text: '0' },
        handleCount: { text: '0' },
        ignoreCount: { text: '0' },
        open: true,
        children: [{
            id: 'Pj4503050001',
            name: { text: '桂林高新万达广场' },
            businessTime: { text: '--' },
            industrial: { text: '商场' },
            ptNum: { text: '0' },
            spaceNum: { text: '0' },
            envStandardRate: { text: '--' },
            alarmCount: { text: '0' },
            alarmHour: { text: '0' },
            transferOrderCount: { text: '0' },
            handleCount: { text: '0' },
            ignoreCount: { text: '0' },
            link: true
        }]
    }
];
/**
 * businessTime: { text: '--' },
 industrial: { text: '--' },
 */

export {
    header,
    header2,
    header4,
    data4,
    data1,
    data0,
    data,
    rowTools,
    topButton,
    dataSelect,
    statistics,
    header5,
    data5,
    data52,
    header6,
    data6,
    header7,
    data7,
    data72,
    header8,
    data8
};
