import { mount } from '@vue/test-utils';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb.tsx', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('data', () => {
        const breadData = [
            { id: 'totalEnergy', name: '总量总量总量总量总量总量总量' },
            { id: 'singleParty', name: '单平米' },
            { id: 'lowerLevel', name: '下级分项' },
            { id: 'average', name: '滑动平均啊啊啊啊', disabled: true }
        ];
        const wrapper = mount({
            render() {
                return () => <Breadcrumb data={breadData} />;
            }
        });
        // console.log(wrapper);
        expect(wrapper.find('.d-breadcrumb')).toEqual('breadData');
    });
});
