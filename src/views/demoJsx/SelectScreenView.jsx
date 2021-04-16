import { defineComponent, reactive, provide } from 'vue';

const data1 = [
    { id: 'all', name: '全部' },
    { id: 'executed', name: '已执行已执行已执行已执行已执行已执行已执行已执行已执行已执行' },
    { id: 'non-execution', name: '未执行' },
    { id: 'audit', name: '审核中' },
    { id: 'has-approval', name: '已审批' },
    { id: 'has-approval2', name: '已审批' },
    { id: 'has-approval3', name: '已审批' },
    { id: 'has-approval4', name: '已审批' },
    { id: 'has-approval41', name: '已审批' },
    { id: 'has-approval42', name: '已审批' },
    { id: 'has-approval43', name: '已审批' },
    { id: 'has-approval44', name: '已审批' },
    { id: 'has-approval45', name: '已审批' },
    { id: 'has-approval46', name: '已审批' }
];

const SelectScreenView = defineComponent({
    name: 'SelectScreenView',
    setup() {
        const state = reactive({
            id: 'all',
            name: '全部',
            data: data1,
            id2: 'all,executed,audit'
        });
        provide('tableLayoutMain', {});

        const screenHandle = (id, obj) => {
            console.log('选中的id：', id, obj);
        };
        return () => (
            <div class="selectScreenView">
                <h3 class="components-title-h3">1.单选</h3>
                <br/>
                {/* <SelectScreen */}
                {/*    status="single" */}
                {/*    selectedId={state.id} */}
                {/*    data={state.data} */}
                {/*    onChange={screenHandle} */}
                {/* /> */}

                <br/><br/><br/>
                <h3 class="components-title-h3">2.单选 + 搜索</h3>
                <br/>
                {/* <SelectScreen */}
                {/*    status="singleSearch" */}
                {/*    selectedId={state.id} */}
                {/*    data={state.data} */}
                {/* /> */}
                <br/>

                <br/><br/><br/>
                <h3 class="components-title-h3">3.多选</h3>
                <br/>
                <SelectScreen
                    status="multiple"
                    selectedId={state.id2}
                    data={state.data}
                    onChange={screenHandle}
                />

                <br/><br/><br/>
                <h3 class="components-title-h3">4.多选 + 搜索</h3>
                <br/>
                {/* <SelectScreen */}
                {/*    status="multipleSearch" */}
                {/*    selectedId={state.id2} */}
                {/*    data={state.data} */}
                {/* /> */}
            </div>
        );
    }
});

export default SelectScreenView;
