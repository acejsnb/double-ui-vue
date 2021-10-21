import { defineComponent, reactive, onMounted, watch } from 'vue';
import Select from '@/components/select/Select';

const selectData = [
	{ id: '000', name: '000' },
	{ id: '111', name: '111' },
	{ id: '222', name: '222' },
	{ id: '333', name: '333', disabled: true },
	{ id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个' },
	{ id: '555', name: '555呀555' }
];
const selectData2 = [
	{ id: '000', name: '000000000000000000000000000000000000000000' },
	{ id: '111', name: '111' }
];
const selectData3 = [
	{ id: '000', name: '000', checked: 'uncheck' },
	{ id: '111', name: '111', checked: 'uncheck' },
	{ id: '222', name: '222', checked: 'uncheck' },
	{
		id: '333',
		name: '333',
		disabled: true,
		checked: 'uncheck'
	},
	{ id: '444', name: '是第四个这是第四个啊啊啊啊啊啊啊四个', checked: 'uncheck' },
	{ id: '555', name: '555呀555', checked: 'uncheck' }
];

const SelectView = defineComponent({
	name: 'SelectView',
	setup() {
		const state = reactive({
			sid: '222',
			sid2: '0',
			selectData,
			sd2: JSON.parse(JSON.stringify(selectData2)),
			mid: ['222', '444'],
			// selectData3,
			errorText: '错误提示',
			errorShow: false
		});

		onMounted(() => {
			// setTimeout(() => {
			//     state.errorText = '这是错误提示';
			//     state.errorShow = true;
			// }, 3000);
			/* setTimeout(() => {
                state.selectData2 = JSON.parse(JSON.stringify(selectData2)).map(d => {
                    d.disabled = true;
                    return d;
                });
            }, 3000); */
		});

		const change = (id: string, item: string) => {
			console.log('change:::', id, item);
		};
		const change3 = (ids: string[], items: any) => {
			console.log('change3:::', ids, items);
		};

		watch(
			() => state.sid2,
			(n, o) => {
				console.log('watch::', n, o);
			}
		);

		return () => {
			const {
				// sid2,
				sd2,
				errorText,
				errorShow
				// mid,
				// selectData3
			} = state;

			return (
				<div class="mSelect">
					<h3 class="components-title-h3">width + caption</h3>
					<Select
						width="180"
						v-model={state.sid2}
						data={sd2}
						errorText={errorText}
						errorShow={errorShow}
						onChange={change}
					/>
					<br />
					<br />
					<Select
						width="300"
						multiple={true}
						v-model={state.mid}
						data={selectData3}
						onChange={change3}
					/>
				</div>
			);
		};
	}
});

export default SelectView;
