import { Modal, ModalProps, Form, Input } from 'antd';
import { validatePassword } from '@/utils/validate';

const ModifyPassword = (props: ModalProps) => {
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    console.log(
      '🚀 ~ file: modifyPassword.tsx:7 ~ handleSubmit ~ values:',
      values,
    );
  };
  return (
    <Modal
      {...props}
      title="修改密码"
      onOk={() => {
        form.submit();
      }}
    >
      <div style={{ padding: '20px', fontSize: 20 }}>账户： AAA</div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="原密码" required name="oldPassword">
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item
          label="新密码"
          required
          name="password"
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
            ({}) => ({
              validator(_, value) {
                if (validatePassword(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    '密码为6-20位，且必须包含大写字母、小写字母、数字、特殊符号(!@#$%^&*)',
                  ),
                );
              },
            }),
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item
          label="确认新密码"
          required
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请确认新密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModifyPassword;
