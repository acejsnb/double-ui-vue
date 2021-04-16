import { defineComponent, reactive, onMounted } from 'vue';

const DrawerView = defineComponent({
    name: 'DrawerView',
    setup() {
        const state = reactive({
            drawerStatus: false,
            loadingMore: false,
            loading: false,
            activeClose: true, // 是否可关闭弹窗
            height: 1000,
            model2: ['test1', 'test4'],
            // model: 'test2',
            model: '', // v-model绑定的id
            selectData: [] // Select数据
        });

        onMounted(() => {
            setTimeout(() => {
                state.model = 45;
                state.selectData = [{
                    id: '44',
                    paramType: 6,
                    code: '1',
                    name: '广场原因'
                }, {
                    id: 45,
                    paramType: 6,
                    code: '2',
                    name: '策略原因'
                }, {
                    id: '46',
                    paramType: 6,
                    code: '3',
                    name: '其他'
                }];
            }, 3000);
        });

        const changeStatus = (v) => {
            state.drawerStatus = v;
        };
        const drawerShow = () => {
            if (state.drawerStatus) return;
            state.drawerStatus = true;
            console.log(state.drawerStatus);
        };
        const drawerConfirm = () => {
            console.log('alertConfirm');
        };
        const drawerCancel = () => {
            console.log('drawerCancel');
            state.drawerStatus = false;
        };
        const getMore = () => {
            console.log('1::', state.loadingMore);
            state.loadingMore = true;
            console.log('2::', state.loadingMore);
            setTimeout(() => {
                state.loadingMore = false;
                state.height = state.height + 100;
            }, 3000);
            console.log('3::', state.loadingMore);
        };
        const closeLoading = () => {
            state.loading = !state.loading;
        };
        const focusChange = (focus) => {
            console.log('focusChange:::', focus);
            state.activeClose = focus;
        };

        return () => {
            const {
                drawerStatus, loadingMore, loading, height
            } = state;
            return (
                <div class="component component-padding">
                    <h1 class="components-title">Drawer组件</h1>
                    <button type="primary" onClick={drawerShow}>drawerShow</button>
                    <button type="default" onClick={closeLoading}>打开关闭loading</button>
                    <Drawer
                        show={drawerStatus}
                        bottom={true}
                        shadow={true}
                        penetrate={false}
                        focus={false}
                        onClose={changeStatus}
                        loadingMore={loadingMore}
                        onGetMore={getMore}
                        loading={loading}
                        componentId="drawerCom"
                        v-slots={{
                            title: () => (
                                <div class="titleContent">
                                    <span class="title">标题</span>
                                </div>
                            ),
                            content: () => (
                                <div style="font-size: 20px;width: 500px; padding: 16px">
                                    123
                                    456
                                    789
                                    <br/>
                                    <br/>
                                    <textarea name="" id="" cols="30" rows="10" style="font-size: 14px"/>
                                    <div style={{ fontSize: '16px', height: `${height}px` }}>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/><br/><br/><br/><br/><br/>
                                    </div>
                                </div>
                            ),
                            handle: () => (
                                <div>
                                    <button type="primary" onClick={drawerConfirm}>确定</button>
                                    <button type="default" onClick={drawerCancel}>取消</button>
                                </div>
                            )
                        }}
                    />
                </div>
            );
        };
    }
});

export default DrawerView;
