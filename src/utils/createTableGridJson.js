import RandomNum from './RandomNum';

const headerDefault = [
    {
        key: 'name',
        text: '项目名称',
        fixed: 'left',
        resizable: true,
        disabled: true
    },
    {
        key: 'date',
        text: '日期',
        sort: {
            open: true, type: 'date', status: 'ord', event: 'sortHandle'
        },
        resizable: true,
        minWidth: 80
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        align: 'center'
    },
    {
        key: 'strategyTime',
        text: '策略推送时间',
        width: 180
    },
    {
        key: 'executeTime',
        text: '应执行时间',
        checked: 'uncheck'
    },
    {
        key: 'dataStatus',
        text: '数据状态'
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)'
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)',
        tip: { open: true, text: '3.室外平均温度=逐日营业时段室外平均温度' },
        width: 180,
        fixed: 'right'
    }
];

const CreateTableGridJson = (num, headerData) => {
    const header = headerData || headerDefault,
        data = [];
    for (let i = 0; i < num; i++) {
        const item = { id: String(i + 1) };
        header.forEach((d, di) => {
            item[d.key] = { text: `${d.text}-${RandomNum(i, i + di + 10)}` };
        });
        data.push(item);
    }

    return { header, data };
};

export default CreateTableGridJson;
