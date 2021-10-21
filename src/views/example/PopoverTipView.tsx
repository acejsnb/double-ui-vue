import { defineComponent, reactive, ref, onMounted } from 'vue';
import PopoverTip from '@/components/popoverTip/PopoverTip';

const PopoverTipView = defineComponent({
	name: 'PopoverTipView',
	setup() {
		const state = reactive({
			popoverTipContent:
				'顶级顶级、一级1一级1一级1一级1一级1一级啊、测试文字溢出、测试文字溢出、鼎折覆餗、水电费、第三方、第三方十多个、的施工队施工、速度赶到事故、的施工队施工、的施工队施工、的施工队施工、的施工队施工、的施工队施工、但是广东省、但是广东省',
			// popoverTipContent: '顶级顶级、一级',
			popoverTipContent2: '四川、成都、高新区'
		});

		const refTrigger = ref(null);
		const countTag = ref(null);

		onMounted(() => {
			// setTimeout(() => {
			//     state.popoverTipContent = '啊啊啊、不不不、冲冲冲';
			// }, 3000);
		});

		return () => {
			const { popoverTipContent } = state;
			return (
				<div style="padding-top: 300px;">
					<h3 class="components-title-h3">1.完整示例</h3>
					<div class="popoverTipView">
						<PopoverTip
							tag={refTrigger.value}
							countTag={countTag.value}
							content={popoverTipContent}
							split={false}
						>
							<div class="tip-test" ref={refTrigger}>
								{popoverTipContent && (
									<>
										已选择<span ref={countTag}>12</span>项
									</>
								)}
							</div>
						</PopoverTip>
					</div>
				</div>
			);
		};
	}
});

export default PopoverTipView;
