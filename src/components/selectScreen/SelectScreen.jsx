import './style.styl';
import {
    defineComponent, ref, reactive, computed, inject, watch, onBeforeUnmount
} from 'vue';

import FilterSvg from '../static/iconSvg/filter.svg';
import TriangleSvg from '../static/iconSvg/triangle.svg';

import DropPanel from './depend/dropPanel';
import PopoverTip from '../popoverTip/PopoverTip';

const SelectScreen = defineComponent({
    name: 'SelectScreen',
    props: {
        // 筛选4种状态 【'single', 'multiple', 'singleSearch', 'multipleSearch'】
        status: {
            type: String,
            default: 'single'
        },
        data: {
            type: Array,
            default: () => []
        },
        // 选中的id
        selectedId: {
            type: String,
            default: ''
        },
        // 选中的name
        selectName: {
            type: String,
            default: ''
        },
        // screen triangle
        icon: {
            type: String,
            default: 'screen'
        },
        placeholder: {
            type: String,
            default: '请输入'
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            dropBoxStatus: false, // 下拉列表展开状态
            dropData: [], // 数据列表
            singleName: '全部',
            choiceId: '', // 选中的id
            selectedData: [] // 多选——选中的数据
        });

        const selectScreen = ref(null);
        const refTrigger = ref(null);

        const tableLayoutMain = inject('tableLayoutMain');

        // 选中的name
        const selectedName = computed(() => {
            const { status } = props,
                { singleName, selectedData } = state;
            if (status.includes('single')) return singleName;
            const selectedNameArr = [];
            selectedData.forEach(d => {
                selectedNameArr.push(d.name);
            });
            return selectedNameArr.toString().replace(/,/g, '、');
        });

        const activeSvg = computed(() => {
            const {
                    data, status, selectedId,
                    icon
                } = props,
                { selectedData } = state;
            if (icon === 'triangle') return;
            if (status.includes('single')) {
                const { id = '' } = data[0];
                return selectedId && selectedId !== id;
            }
            if (status.includes('multiple')) {
                return selectedData.length > 0;
            }
            return false;
        });

        // 初始化设置数据
        const setInit = (id = '', data = []) => {
            const { status } = props;
            state.choiceId = id;
            if (status.includes('single')) {
                const { name = '' } = data.find(d => d.id === id) || {};
                state.singleName = name;
            } else {
                state.selectedData = data.filter(d => {
                    if (d.checked === 'checked') return d;
                    return null;
                });
            }
            state.dropData = data;
        };
        setInit(props.selectedId, JSON.parse(JSON.stringify(props.data)));

        watch(() => props.data, (n) => {
            setInit(props.selectedId, JSON.parse(JSON.stringify(n)));
        }, { deep: true });
        // 监听选中的id改变
        watch(() => props.selectedId, (n, o) => {
            if (n === o || n === state.choiceId) return;
            setInit(n, JSON.parse(JSON.stringify(props.data)));
        });

        let dropPanel, parentScroll;
        // 设置下拉状态
        const setDropdownStatus = (status) => {
            state.dropBoxStatus = status;
            if (dropPanel) {
                dropPanel.type.state.dropBoxStatus = status;
                if (status) dropPanel.resetPosition();
            }
        };
        // 监听滚动条滚动
        const listenScroll = () => {
            if (state.dropBoxStatus) setDropdownStatus(false);
        };
        const dropChange = (id, selectedData) => {
            const { status, icon } = props;
            state.choiceId = id;
            if (dropPanel) dropPanel.component.props.selectedId = id;
            if (status.includes('single')) state.singleName = selectedData.name;
            else state.selectedData = selectedData;
            emit('change', icon, id, selectedData);
        };
        // 展开下拉列表
        const openDropBox = () => {
            const { dropBoxStatus } = state;
            if (dropBoxStatus) {
                setDropdownStatus(false);
                return;
            }
            if (dropPanel) {
                setDropdownStatus(true);
            } else {
                const {
                        status, selectedId, icon, placeholder
                    } = props,
                    {
                        dropData: data, selectName
                    } = state;
                dropPanel = DropPanel({
                    tag: selectScreen,
                    propsData: {
                        status,
                        data,
                        selectedId,
                        selectName,
                        icon,
                        placeholder,
                        change(id, selectedData) {
                            dropChange(id, selectedData);
                            setDropdownStatus(false);
                        },
                        cancel(dropdownStatus) {
                            setDropdownStatus(dropdownStatus);
                        }
                    }
                });

                setDropdownStatus(true);

                // 监听滚动条滚动
                parentScroll = tableLayoutMain?.$refs?.tableLayoutMain;
                if (parentScroll) parentScroll.addEventListener('scroll', listenScroll, false);
                window.addEventListener('scroll', listenScroll, false);
            }
        };

        onBeforeUnmount(() => {
            setDropdownStatus(false);
            dropPanel.remove();
            if (parentScroll) parentScroll.removeEventListener('scroll', listenScroll);
            window.removeEventListener('scroll', listenScroll);
        });

        return () => {
            const { icon } = props,
                { dropBoxStatus } = state;
            return (
                <div class={['p-select-screen', dropBoxStatus && 'p-select-screen-none']}
                    onClick={e => {
                        e.stopPropagation();
                        openDropBox();
                    }}
                    ref={selectScreen}
                >
                    <PopoverTip
                        tag={refTrigger}
                        countTag={refTrigger}
                        content={selectedName}
                        dropShow={dropBoxStatus}
                    >
                        <i class={[
                            'p-select-screen-svg',
                            (icon === 'triangle' && !dropBoxStatus) && 'p-select-triangle-open',
                            activeSvg.value && 'p-select-screen-svg-active'
                        ]}
                        ref={refTrigger}
                        >
                            {icon === 'triangle' ? <TriangleSvg/> : <FilterSvg/>}
                        </i>
                    </PopoverTip>
                    {dropBoxStatus && <div class="p-select-screen-shade" onClick={e => { e.stopPropagation(); }}/>}
                </div>
            );
        };
    }
});

export default SelectScreen;
