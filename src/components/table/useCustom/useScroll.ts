import { Ref, ref } from 'vue';

interface UseScrollReturn {
    scrollLeftValue: Ref<number>
    headerRef: Ref<HTMLDivElement>
    bodyRef: Ref<HTMLDivElement>
    bodyVerticalBarRef: Ref<HTMLDivElement>
    horizontalBarRef: Ref<HTMLDivElement>
    bodyScrollHandle(e: MouseEvent): void
    barScrollBodyHandle(e: MouseEvent): void
    barScrollHandle(e: MouseEvent): void
}
type UseScroll = () => UseScrollReturn;

// 滚动条设置
const useScroll: UseScroll = () => {
    const scrollLeftValue = ref(0);
    // DOM 表头
    const headerRef = ref<HTMLDivElement>();
    // DOM 表体
    const bodyRef = ref<HTMLDivElement>();
    // DOM 表体竖向滚动条
    const bodyVerticalBarRef = ref<HTMLDivElement>();
    // DOM 横向滚动条
    const horizontalBarRef = ref<HTMLDivElement>();
    // 表体滚动
    const bodyScrollHandle = (e: MouseEvent) => {
        const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
        scrollLeftValue.value = scrollLeft;
        bodyVerticalBarRef.value && (
            bodyVerticalBarRef.value.scrollTop = scrollTop
        );
        headerRef.value.scrollLeft = scrollLeft;
        horizontalBarRef.value.scrollLeft = scrollLeft;
    };
    // 表体竖向滚动条
    const barScrollBodyHandle = (e: MouseEvent) => {
        const { scrollTop } = e.target as HTMLDivElement;
        bodyRef.value.scrollTop = scrollTop;
    };
    // 横向滚动条
    const barScrollHandle = (e: MouseEvent) => {
        const { scrollLeft } = e.target as HTMLDivElement;
        scrollLeftValue.value = scrollLeft;
        headerRef.value.scrollLeft = scrollLeft;
        bodyRef.value.scrollLeft = scrollLeft;
    };

    return {
        scrollLeftValue,
        headerRef,
        bodyRef,
        bodyVerticalBarRef,
        horizontalBarRef,
        bodyScrollHandle,
        barScrollBodyHandle,
        barScrollHandle
    };
};
export default useScroll;
