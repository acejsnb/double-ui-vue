import { defineComponent, reactive, onMounted } from 'vue';
import Table from '../../components/table/Table';

const data = [
    {
        id: '0001-1', name: { text: '小红小红小红小红小红小红小红小红小红小红小红小红小红小红小红' }, sex: { text: '男' }, age: { text: '18', color: '#f76b64' }, job: { text: '大佬' }
    },
    {
        id: '0001-2', name: { text: '小花' }, sex: { text: '男' }, age: { text: '17' }, job: { text: '前端' }
    },
    {
        id: '0001-3', name: { text: '小刚' }, sex: { text: '女' }, age: { text: '12' }, job: { text: '后端' }
    },
    {
        id: '0001-4', name: { text: '小刘' }, sex: { text: '男' }, age: { text: '13' }, job: { text: 'UX' }
    },
    {
        id: '0001-5', name: { text: '小牟' }, sex: { text: '妖' }, age: { text: '13' }, job: { text: 'UX' }
    },
    {
        id: '0001-6', name: { text: '小牟' }, sex: { text: '妖' }, age: { text: '13' }, job: { text: 'UX' }
    },
    {
        id: '0001-7', name: { text: '小牟' }, sex: { text: '妖' }, age: { text: '13' }, job: { text: 'UX' }
    }
];
const columns = [
    { key: 'name', field: '姓名' },
    { key: 'sex', field: '性别' },
    { key: 'age', field: '年龄' },
    { key: 'job', field: '工作' }
];

const TableView = defineComponent({
    name: 'TableView',
    setup() {
        const state = reactive({
            width: 1200
        });
        return () => (
            <div class="component component-padding">
                <Table key="1" border colMinWidth="180" data={data} columns={columns}/>
                <br/><br/><br/>
                <div style="height: 300px">
                    <Table key="2" data={data} columns={columns}/>
                </div>
            </div>
        );
    }
});

export default TableView;
