import './style.styl';
import { PropType, defineComponent } from 'vue';
import ArrowRight from '@/assets/iconSvg/arrow_right.svg';
import TitleTip from '@/components/titleTip';
import { Item } from './types';

type SeparatorProps = {
    separator: '-' | '/'
}
const SeparatorDom = ({ separator }: SeparatorProps) => (
    <span class="d-breadcrumb-separator">
        { separator ? separator : <ArrowRight /> }
    </span>
);

const Breadcrumb = defineComponent({
    name: 'DBreadcrumb',
    directives: {
        titletip: {
            mounted: TitleTip,
            beforeUnmount: TitleTip.remove
        }
    },
    props: {
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
        // 分隔符
        separator: {
            type: String as PropType<'-' | '/'>,
            default: ''
        },
        onChange: {
            type: Function as PropType<(id: string) => void>,
            default: () => {}
        }
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
        const breadcrumbClick = (id: string) => {
            if (props.modelValue) emit('update:modelValue', id);
            else emit('change', id);
        };
        return () => {
            const { data, modelValue, separator } = props;
            return (
                <div class="d-breadcrumb">
                    {data.map((item, i) => (
                        <section class="d-breadcrumb-item" key={`${i}-${item.id}`}>
                            <article
                                class={{
                                    'd-breadcrumb-item-text': true,
                                    'd-breadcrumb-item-active': modelValue
                                        ? modelValue === item.id
                                        : i === data.length - 1,
                                    'd-breadcrumb-item-width': i > 0 && i < props.data.length - 1,
                                    'd-breadcrumb-item-max-width': i === data.length - 1
                                }}
                                v-titletip
                                onClick={() => breadcrumbClick(item.id)}
                            >
                                {item.name}
                            </article>
                            { i < data.length - 1 && <SeparatorDom separator={separator} /> }
                        </section>
                    ))}
                </div>
            );
        };
    }
});

export default Breadcrumb;
