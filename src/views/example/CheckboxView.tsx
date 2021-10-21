import { defineComponent, reactive } from 'vue';

import Checkbox from '@/components/checkbox/Checkbox';

const CheckboxView = defineComponent({
	name: 'CheckboxView',
	setup() {
		const state = reactive({
			checked1: 'checked', // checked-选中 uncheck-未选中 notNull-半选
			checked2: 'uncheck',
			checked3: 'notNull'
		});
		const handleChange = (v: string, obj: any) => {
			console.log(v);
			console.log(obj);
			state.checked1 = v;
		};

		return () => {
			// const { checked1, checked2, checked3 } = state;
			const { checked1 } = state;
			return (
				<div class="checkbox">
					<Checkbox
						v-model={[checked1, 'checked']}
						attr="p1000"
						onChange={handleChange}
					/>
					<Checkbox v-model={[checked1, 'checked']} disabled={true} />
					<Checkbox v-model={[state.checked2, 'checked']}>123</Checkbox>
					<Checkbox v-model={[state.checked3, 'checked']} />
				</div>
			);
		};
	}
});

export default CheckboxView;
