/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-11-08 22:15:54
 * @LastEditors: songone
 * @LastEditTime: 2022-11-22 22:04:10
 * @FilePath: \kami-ip-management\src\pages\Agent\components\addAccountModal.tsx
 */
import { Modal, ModalProps, Form, Select, Input, InputNumber } from 'antd';

type PropsType = ModalProps & {
  onSuccess?: any;
};
const AddAccountModal: React.FC<PropsType> = (props) => {
  const { onSuccess, ...modalProps } = props;
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (onSuccess) {
      onSuccess(values);
    }
  };

  return (
    <Modal
      {...modalProps}
      title="新建子账户"
      okText="提交"
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 8 }}
        style={{ width: 300 }}
      >
        <Form.Item label="子账户名称" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="地区" name="region">
          <Select placeholder="请选择地区">
            <Select.Option value="newyork">纽约</Select.Option>
            <Select.Option value="huashengdun">华盛顿</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="购买流量" name="count">
          <InputNumber step={1} placeholder="请输入"></InputNumber>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
