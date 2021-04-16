import { defineComponent, reactive, onMounted } from 'vue';

import TreeData from '@/static/treeData';
import CreatePTreeJson from '@/utils/createPTreeJson';

const treeJson = CreatePTreeJson(3);

const dataArr = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        open: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                children: [
                    { id: '12', name: '二级2' },
                    { id: '121', name: '二级3' },
                    { id: '122', name: '二级4' },
                    {
                        id: '1321',
                        name: '二级1',
                        open: true,
                        // defaultDisabled: true,
                        children: [
                            { id: '13', name: '三级2' },
                            { id: '131', name: '三级3' },
                            { id: '132', name: '三级4' }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                children: [
                    { id: '222', name: '二级2' },
                    { id: '2221', name: '二级1' },
                    { id: '2222', name: '二级3' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                children: [
                    { id: '322', name: '二级2' },
                    { id: '3220', name: '二级0' },
                    { id: '3221', name: '二级1' }
                ]
            }
        ]
    }
];

const TreeView = defineComponent({
    name: 'TreeView',
    setup() {
        const state = reactive({
            singleId: 'BMMb53ee282ca474d08b7ebaf7ed7bd5b5c',
            treeData: TreeData,
            multipleId: ['12', '121', '322'],
            treeData2: JSON.parse(JSON.stringify(dataArr)),
            treeData21: JSON.parse(JSON.stringify(dataArr)),
            treeData3: JSON.parse(JSON.stringify(dataArr)),
            treeData4: JSON.parse(JSON.stringify(dataArr)),
            multipleId5: ['1321'],
            tileData5: [],
            treeData5: [],
            multipleId6: [],
            treeData6: JSON.parse(JSON.stringify(treeJson)),
            multipleId7: [],
            treeData7: JSON.parse(JSON.stringify(treeJson))
        });

        const openNode = (item) => {
            console.log('展开子项::', item);
        };
        const change = (item) => {
            console.log('选择的项::::', item);
        };
        const change2 = ({ item, checkedIds, checkedData }) => {
            console.log('选择的项::::', item, checkedIds, checkedData);
        };

        // 平铺数据
        const setTileTool = (result, tree, parentId = '-1') => new Promise(resolve => {
            tree.forEach(d => {
                const obj = {
                    parentId,
                    id: d.id,
                    name: d.name
                };
                result.push(obj);
                if (d.children && d.children instanceof Array && JSON.stringify(d.children).length > 4) {
                    setTileTool(result, d.children, d.id);
                }
            });
            resolve(result);
        });

        onMounted(() => {
            const treeData = JSON.parse(JSON.stringify(dataArr));
            setTileTool([], treeData).then(res => {
                state.tileData5 = res;
                state.treeData5 = treeData;
            });
        });
        const slotHtml = (item) => (
            <div class="section-tag" key={item.id}>
                <section class="p-tree-com-checkbox">
                    <Checkbox disabled={item.disabled} checked={item.checked}/>
                </section>
                <article class="p-tree-com-text">{item.name}</article>
            </div>
        );
        const slots = (data) => {
            const obj = {};
            data.forEach(d => {
                obj[d.id] = (item) => slotHtml(item);
            });
            return obj;
        };

        return () => {
            const {
                singleId, treeData,
                multipleId, treeData2,
                treeData21,
                treeData3,
                treeData4,
                multipleId5, tileData5, treeData5,
                multipleId6, treeData6,
                multipleId7, treeData7
            } = state;
            return (
                <div class="component component-padding">
                    <h1 className="components-title">Tree组件</h1>
                    {/* <div> */}
                    {/*    <h3 class="components-title-h3">1.单选</h3> */}
                    {/*    <Tree */}
                    {/*        v-model={singleId} */}
                    {/*        data={treeData} */}
                    {/*        onChange={change} */}
                    {/*        onOpenNode={openNode} */}
                    {/*    /> */}
                    {/* </div> */}
                    {/* <div> */}
                    {/*    <h3 class="components-title-h3">2.多选-联动</h3> */}
                    {/*    <Tree */}
                    {/*        v-model={multipleId} */}
                    {/*        data={treeData2} */}
                    {/*        multiple={true} */}
                    {/*        includeParent={false} */}
                    {/*        onChange={change2} */}
                    {/*        onOpenNode={openNode} */}
                    {/*    /> */}
                    {/* </div> */}
                    {/* <div> */}
                    {/*    <h3 class="components-title-h3">2.1.多选-联动-返回半选状态数据</h3> */}
                    {/*    <Tree */}
                    {/*        multiple={true} */}
                    {/*        notNull={true} */}
                    {/*        includeParent={false} */}
                    {/*        data={treeData21} */}
                    {/*        onChange={change2} */}
                    {/*    /> */}
                    {/* </div> */}
                    {/* <div> */}
                    {/*    <h3 class="components-title-h3">3.多选-不联动</h3> */}
                    {/*    <Tree */}
                    {/*        multiple={true} */}
                    {/*        linkage={false} */}
                    {/*        data={treeData3} */}
                    {/*        onChange={change2} */}
                    {/*    /> */}
                    {/* </div> */}
                    {/* <div> */}
                    {/*    <h3 className="components-title-h3">4.多选-只能选择末级</h3> */}
                    {/*    <Tree */}
                    {/*        multiple={true} */}
                    {/*        linkage={false} */}
                    {/*        lastStage={true} */}
                    {/*        data={treeData4} */}
                    {/*        onChange={change2} */}
                    {/*    /> */}
                    {/* </div> */}
                    {/* <div> */}
                    {/*    <h3 className="components-title-h3">5.父级选中子级禁用，子级选中不影响父级</h3> */}
                    {/*    <Tree */}
                    {/*        v-model={multipleId5} */}
                    {/*        multiple={true} */}
                    {/*        childDisable={true} */}
                    {/*        data={treeData5} */}
                    {/*        onChange={change2} */}
                    {/*    /> */}
                    {/* </div> */}
                    <div>
                        <h3 class="components-title-h3">6.通过slot自定义内容</h3>
                        <Tree
                            render="custom"
                            multiple={true}
                            allCheckboxShow={false}
                            childDisable={true}
                            v-model={multipleId5}
                            data={treeData5}
                            onChange={change2}
                            v-slots={slots(tileData5)}
                        />
                    </div>
                    {/* <div> */}
                    {/*    <h3 class="components-title-h3">7.父子选中子级禁用</h3> */}
                    {/*    <Tree */}
                    {/*        multiple={true} */}
                    {/*        childDisable={true} */}
                    {/*        v-model={multipleId6} */}
                    {/*        data={treeData6} */}
                    {/*        onChange={change2} */}
                    {/*    /> */}
                    {/* </div> */}
                    <div>
                        <h3 class="components-title-h3">8.显示更多操作</h3>
                        <Tree
                            multiple={true}
                            childDisable={true}
                            omit={true}
                            v-model={multipleId7}
                            data={treeData7}
                            onChange={change2}
                        />
                    </div>
                </div>
            );
        };
    }
});

export default TreeView;
