import './style.styl';

import { defineComponent } from 'vue';
import TitleTip from '../titleTip';

import ArrowRight from '../static/iconSvg/arrow_right.svg';

const ArrowRightDom = (
    <article class="p-breadcrumb-arrow">
        <ArrowRight/>
    </article>
);

const Breadcrumb = defineComponent({
    name: 'Breadcrumb',
    props: {
        // 数据列表
        data: {
            type: Array,
            default: () => []
        },
        // 当前高亮显示的id
        modelValue: {
            type: String,
            default: ''
        }
    },
    directives: {
        titletip: {
            mounted: TitleTip,
            beforeUnmount: TitleTip.remove
        }
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
        const breadcrumbClick = (id) => {
            if (props.modelValue) emit('update:modelValue', id);
            else emit('change', id);
        };
        return () => {
            const { data, modelValue } = props;
            return (
                <div class="p-breadcrumb">
                    {
                        data.map((item, i) => (
                            <section class="p-breadcrumb-item" key={`${i}-${item.id}`}>
                                <article class={{
                                    'p-breadcrumb-item-text': true,
                                    'p-breadcrumb-item-active': (modelValue ? modelValue === item.id : i === data.length - 1),
                                    'p-breadcrumb-item-width': (i > 0 && i < props.data.length - 1),
                                    'p-breadcrumb-item-max-width': (i === data.length - 1)
                                }}
                                v-titletip={item.name}
                                onClick={() => breadcrumbClick(item.id)}
                                >{item.name}</article>
                                {(i < data.length - 1) && <ArrowRightDom/>}
                            </section>
                        ))
                    }
                </div>
            );
        };
    }
});

export default Breadcrumb;
