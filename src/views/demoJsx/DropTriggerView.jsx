import { defineComponent, reactive } from 'vue';

import DropTrigger from '../../components/dropTrigger/DropTrigger';

const DropTriggerView = defineComponent({
    name: 'DropTriggerView',
    setup() {
        const state = reactive({
            dropShow: false,
            selectedData: [
                { id: '000', name: '零' },
                { id: '111', name: '壹壹' },
                { id: '222', name: '贰贰贰' },
                { id: '333', name: '贰贰贰' },
                { id: '444', name: '贰贰贰贰贰贰贰贰贰贰贰贰' },
                { id: '555', name: '贰贰贰贰贰贰贰贰贰' }
            ]
        });

        const dropClick = () => {
            state.dropShow = true;
        };

        return () => (<div>
            <h2 className="components-title-h2">DropTrigger-触发器使用方式</h2>
            <br/>
            <DropTrigger
                caption="标题："
                width="200"
                multiple={true}
                selectedData={state.selectedData}
                onClick={dropClick}
            />
        </div>);
    }
});

export default DropTriggerView;
