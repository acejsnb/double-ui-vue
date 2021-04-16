import { defineComponent, reactive } from 'vue';

const data = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' },
    { id: 'lowerLevel', name: '下级分项' },
    { id: 'lowerLevel2', name: '下级分项2' },
    { id: 'lowerLevel3', name: '下级分项3' },
    { id: 'lowerLevel4', name: '下级分项4' },
    { id: 'lowerLevel45', name: '下级分项5' },
    { id: 'average', name: '滑动平均滑动平均滑动平均滑动平均', disabled: true },
    { id: 'lowerLevel451', name: '下级分项6' }
];
const data2 = [
    { id: 'totalEnergy', name: '总量' },
    { id: 'singleParty', name: '单平米' }
];

const DropdownView = defineComponent({
    name: 'DropdownView',
    setup() {
        const state = reactive({
            selVal: 'totalEnergy',
            selText: '总量',
            dataSelect: data,
            selVal2: 'totalEnergy',
            dataSelect2: data2
        });
        const dropdownChange = (id, name) => {
            // console.log('dropdownChange::', id, name);
            state.selVal = id;
            state.selText = name;
        };

        return () => {
            const {
                selVal, selVal2, selText, dataSelect, dataSelect2
            } = state;
            return (
                <div className="component component-padding">
                    <h1 className="components-title">Dropdown组件</h1>
                    <div>
                        <h3 className="components-title-h3">1</h3>
                        <Dropdown v-model={selVal} data={dataSelect} maxCount="8" onChange={dropdownChange}>
                            {selText}
                        </Dropdown>
                    </div>
                    <div>
                        <h3 className="components-title-h3">2</h3>
                        <Dropdown v-model={selVal} data={dataSelect} trigger="click" openSearch={true} onChange={dropdownChange}>
                            <span class="text">{selText}</span>
                        </Dropdown>
                    </div>
                    <div style="padding-right: 50px;text-align: right">
                        <h3 class="components-title-h3">3</h3>
                        <Dropdown v-model={selVal} minWidth="120" maxWidth="240" data={dataSelect2}>
                            <span class="text">{selText}</span>
                        </Dropdown>
                    </div>
                    <div style="padding-right: 10px;text-align: right">
                        <h3 class="components-title-h3">4</h3>
                        <Dropdown v-model={selVal} minWidth="112" maxWidth="112" data={dataSelect}>
                            <span class="text">{selText}</span>
                        </Dropdown>
                    </div>
                    <div style="margin-left: 200px">
                        <Dropdown v-model={selVal2} data={dataSelect2}>
                            <span class="avatar">
                                <img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt=""/>
                            </span>
                        </Dropdown>
                    </div>
                </div>
            );
        };
    }
});

export default DropdownView;
