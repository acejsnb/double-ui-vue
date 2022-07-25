import RandomNum from '@/utils/RandomNum';

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
            open: true,
            type: 'date',
            status: 'ord',
            event: 'sortHandle'
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

const CreateTableGridJson = (
    num: number,
    headerData: (
		| {
				key: string;
				text: string;
				fixed: string;
				resizable: boolean;
				disabled: boolean;
				sort?: undefined;
				minWidth?: undefined;
				align?: undefined;
				width?: undefined;
				checked?: undefined;
				tip?: undefined;
		  }
		| {
				key: string;
				text: string;
				sort: { open: boolean; type: string; status: string; event: string };
				resizable: boolean;
				minWidth: number;
				fixed?: undefined;
				disabled?: undefined;
				align?: undefined;
				width?: undefined;
				checked?: undefined;
				tip?: undefined;
		  }
		| {
				key: string;
				text: string;
				align: string;
				fixed?: undefined;
				resizable?: undefined;
				disabled?: undefined;
				sort?: undefined;
				minWidth?: undefined;
				width?: undefined;
				checked?: undefined;
				tip?: undefined;
		  }
		| {
				key: string;
				text: string;
				width: number;
				fixed?: undefined;
				resizable?: undefined;
				disabled?: undefined;
				sort?: undefined;
				minWidth?: undefined;
				align?: undefined;
				checked?: undefined;
				tip?: undefined;
		  }
		| {
				key: string;
				text: string;
				checked: string;
				fixed?: undefined;
				resizable?: undefined;
				disabled?: undefined;
				sort?: undefined;
				minWidth?: undefined;
				align?: undefined;
				width?: undefined;
				tip?: undefined;
		  }
		| {
				key: string;
				text: string;
				fixed?: undefined;
				resizable?: undefined;
				disabled?: undefined;
				sort?: undefined;
				minWidth?: undefined;
				align?: undefined;
				width?: undefined;
				checked?: undefined;
				tip?: undefined;
		  }
		| {
				key: string;
				text: string;
				tip: { open: boolean; text: string };
				width: number;
				fixed: string;
				resizable?: undefined;
				disabled?: undefined;
				sort?: undefined;
				minWidth?: undefined;
				align?: undefined;
				checked?: undefined;
		  }
	)[]
) => {
    const header = headerData || headerDefault;
    const data = [];
    for (let i = 0; i < num; i++) {
        const item = { id: String(i + 1) };
        header.forEach((d: { key: string | number; text: any }, di: number) => {
            item[d.key] = { text: `${d.text}-${RandomNum(i, i + di + 10)}` };
        });
        data.push(item);
    }

    return { header, data };
};

export default CreateTableGridJson;
