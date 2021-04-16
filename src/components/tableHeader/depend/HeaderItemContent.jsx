import { defineComponent, ref } from 'vue';

import NoteSvg from '../../static/iconSvg/action/note.svg';
import SortSvg from '../../static/iconSvg/sort.svg';
import SelectScreen from '../../selectScreen/SelectScreen';
import TextEllipsis from '../../static/utils/TextEllipsis';
import PopoverTip from '../../popoverTip/PopoverTip';

const HeaderItemContent = defineComponent({
    name: 'HeaderItemContent',
    props: {
        index: {
            type: Number,
            default: null
        },
        header: {
            type: Object,
            default: () => ({})
        },
        colWidth: {
            type: Array,
            default: () => ([])
        },
        // 显示所有边框
        border: {
            type: Boolean,
            default: false
        },
        disableSort: {
            type: Boolean,
            default: false
        },
        // 是否是子级
        isChild: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const refTrigger = ref(null);
        const countTag = ref(null);
        // 设置文字宽度
        const setSpanWidth = () => {
            const {
                    header, index, colWidth, border
                } = props,
                { screen, sort, tip } = header;
            const status = [
                    screen && screen.open && screen.data && screen.data.length,
                    sort && sort.open,
                    tip && tip.open
                ],
                trueLen = status.filter(d => d).length,
                pw = 40, // padding所占宽度
                ow = trueLen * 24, // 图标所占宽度
                thw = colWidth[index]; // th的宽度
            return (thw - pw - ow - border);
        };
        // 排序函数
        const sortHandle = (val) => {
            const { header, disableSort } = props;
            if (disableSort) return;
            const {
                key, sort: {
                    status, closeDefault = false, event, func, open, type
                }
            } = header;
            let st;
            if (status === val && !closeDefault) st = '';
            else st = val;
            const sort = {
                status: st,
                closeDefault,
                event,
                func,
                open,
                type
            };
            if (event && func) header.sort.func(st, type, key);
            header.sort = sort;
        };
        const screenChange = ([header, icon, id, selectedData]) => {
            const { key, parentKey, screen: { status } } = header;
            if (status.includes('single')) {
                header.screen.selectId = id;
                header.screen.selectName = selectedData.name;
            }
            header.screen.func(status, key, id, selectedData, icon, parentKey);
        };

        return () => {
            const { isChild, header, disableSort } = props;
            return <div class="p-table-header-text">
                <span class="p-table-header-span"
                    style={{ maxWidth: !isChild && `${setSpanWidth()}px`, color: header.color }}
                    onMouseenter={TextEllipsis}
                >{header.text}</span>
                {/* 筛选 */}
                <>{
                    (header.screen && header.screen.open && header.screen.data && header.screen.data.length) && (
                        <SelectScreen
                            icon={header.screen.icon}
                            status={header.screen.status}
                            selectedId={header.screen.selectId}
                            selectName={header.screen.selectName}
                            data={header.screen.data}
                            onChange={(args) => screenChange([header, ...args])}
                        />
                    )
                }</>
                {/* 排序 */}
                <>{
                    (header.sort && header.sort.open) && (
                        <span class={['p-table-header-sort', disableSort && 'p-table-header-sort-disabled']}>
                            <SortSvg class={[header.sort.status === 'seq' && 'p-table-header-sort-active']} onClick={() => sortHandle('seq')} />
                            <SortSvg class={['p-table-header-sort-triangle', header.sort.status === 'ord' && 'p-table-header-sort-active']}
                                onClick={() => sortHandle('ord')}
                            />
                        </span>
                    )
                }</>
                {/* 提示 */}
                <>{
                    (header.tip && header.tip.open) && (
                        <PopoverTip
                            tag={refTrigger}
                            countTag={countTag}
                            theme="dark"
                            content={header.tip.text}
                            split={false}
                        >
                            <span class="p-table-header-note" ref={refTrigger}>
                                <NoteSvg ref={countTag} class={[header.tip && header.tip.iconColor && `p-table-header-note-${header.tip.iconColor}`]} />
                            </span>
                        </PopoverTip>
                    )
                }</>
            </div>;
        };
    }
});

export default HeaderItemContent;
