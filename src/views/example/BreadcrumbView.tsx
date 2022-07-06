import { defineComponent, ref, watch } from 'vue';
import Breadcrumb from '@/components/breadcrumb/Breadcrumb';

const breadData = [
    { id: 'totalEnergy', name: '总量总量总量总量总量总量总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
];

const BreadcrumbView = defineComponent({
    name: 'BreadcrumbView',
    setup() {
        const breadId = ref('average');
        const change = (id: string) => {
            console.log('change::', id);
        };

        watch(
            () => breadId.value,
            (n, o) => {
                if (n === o) return;
                console.log('breadId:::', n);
            }
        );

        return () => (
            <div class="toggleView">
                <div class="component component-padding">
                    <h1 class="components-title">Breadcrumb组件</h1>
                    {
                        // data: Breadcrumb数据
                        // v-model绑定的面包屑的值，若有绑定了该值，表示可点击
                    }

                    <Breadcrumb data={breadData} v-model={breadId.value} />
                    <Breadcrumb data={breadData} onChange={change} />
                    <Breadcrumb data={breadData} separator="-" onChange={change} />
                    <Breadcrumb data={breadData} separator="/" onChange={change} />
                    {/* <Breadcrumb data={breadData} onChange={change} /> */}
                </div>
            </div>
        );
    }
});

export default BreadcrumbView;
