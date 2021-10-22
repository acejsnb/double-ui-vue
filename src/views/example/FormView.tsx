import { defineComponent } from 'vue';
import Form from '@/components/form';
import Button from '@/components/button';
import Input from '@/components/input';
type Params = {[key: string]: any}

const usernameRules = [
    { check: 'required', message: '请输入用户名' }
];
const passwordRules = [
    { check: 'required', message: '请输入密码' },
    { check: 'passwordBetter', message: '密码不正确' }
];

const validate = (value: string, confirmValue: string) =>
    // console.log('value', value);
    // console.log('FieldValue', confirmValue);
    (confirmValue === value)
;
const confirmPasswordRules = [
    { check: 'required', message: '请输入确认密码' },
    { validate, message: '两次输入的密码必须相同' }
];

const FormView = defineComponent({
    name: 'ButtonView',
    setup() {
        const submit = (params: Params) => {
            console.log(params);
        };
        const reset = () => {
            console.log('reset');
        };
        return () => (
            <div class="component component-padding">
                <Form onSubmit={submit} onReset={reset}>
                    <Form.Item label="用户名" name="username" required rules={usernameRules}>
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item label="密码" name="password" required rules={passwordRules}>
                        <Input type="password" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item label="确认密码" name="confirmPassword" confirmName="password" required rules={confirmPasswordRules}>
                        <Input type="password" placeholder="请输入确认密码" />
                    </Form.Item>
                    <Form.Item classes="form-cus-class">
                        <Button type="blue" htmlType="submit">登录</Button>
                        <Button htmlType="reset">取消</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
});

export default FormView;
