import { ExtractPropTypes, PropType } from 'vue';

export interface Item {
	id: string;
	name: string;
	disabled?: boolean;
}
export const breadcrumbProps = {
    // 数据列表
    data: {
        type: Array as PropType<Item[]>,
        default: () => [] as Item[],
        required: true
    },
    // 当前高亮显示的id
    modelValue: {
        type: String,
        default: ''
    },
    onChange: {
        type: Function,
        default: () => {}
    }
};

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
