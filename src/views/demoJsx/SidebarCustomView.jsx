import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SidebarCustomView',
    setup() {
        const sidebarChange = (leftWidth, leftShow) => {
            console.log('leftWidth::', leftWidth);
            console.log('leftShow::', leftShow);
        };
        return () => (
            <div class="sidebarCustom" style="width: 100%; height: 800px;">
                <SidebarCustom
                    width="250"
                    onChange={sidebarChange}
                    v-slots={{
                        left: () => (<div style="font-size: 14px;">123</div>),
                        right: () => (<div style="font-size: 14px;">456</div>)
                    }}
                />
            </div>
        );
    }
});
