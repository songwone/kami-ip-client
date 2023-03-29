/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:27:34
 * @LastEditors: songone
 * @LastEditTime: 2022-11-08 22:06:20
 * @FilePath: \kami-ip-management\src\pages\Agent\build.tsx
 */
import { Form, Select, Input, Radio, Button, Tabs, InputNumber } from 'antd';

const AgentBuildPage: React.FC = () => {
  return (
    <div className="page-container">
      <Tabs>
        <Tabs.TabPane tab="子账户接入" key="item-1">
          <Form style={{ width: 300 }}>
            <Form.Item label="账户">
              <Input type="text" readOnly />
            </Form.Item>
            <Form.Item label="国家">
              <Input readOnly placeholder="随机"></Input>
            </Form.Item>
            <Form.Item label="地区">
              <Input readOnly placeholder="随机"></Input>
            </Form.Item>
            <Form.Item label="城市">
              <Input readOnly placeholder="随机"></Input>
            </Form.Item>
            <Form.Item label="协议">
              <Radio.Group>
                <Radio value={1}>http</Radio>
                <Radio value={2}>https</Radio>
                <Radio value={3}>http/https</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="轮换类型">
              <Radio.Group>
                <Radio value={1}>轮换</Radio>
                <Radio value={2}>粘性</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="IP时长">
              <Select>
                <Select.Option key={10}>10分钟</Select.Option>
                <Select.Option key={30}>30分钟</Select.Option>
                <Select.Option key={60}>60分钟</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="单价">
              <div>5美元/G</div>
            </Form.Item>
            <Form.Item label={<span>&nbsp;</span>} colon={false}>
              <Button htmlType="submit" type="primary">
                生成代理
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="白名单接入" key="item-2">
          <Form style={{ width: 300 }}>
            <Form.Item label="选择IP">
              <Select>
                <Select.Option key={1}>192.168.1.1</Select.Option>
                <Select.Option key={2}>192.168.2.2</Select.Option>
                <Select.Option key={3}>192.168.2.3</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="国家">
              <Input readOnly disabled></Input>
            </Form.Item>
            <Form.Item label="地区">
              <Input readOnly disabled></Input>
            </Form.Item>
            <Form.Item label="协议">
              <Radio.Group>
                <Radio value={1}>http</Radio>
                <Radio value={2}>https</Radio>
                <Radio value={3}>http/https</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="轮换类型">
              <Radio.Group>
                <Radio value={1}>轮换</Radio>
                <Radio value={2}>粘性</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="IP时长">
              <Select>
                <Select.Option key={10}>10分钟</Select.Option>
                <Select.Option key={30}>30分钟</Select.Option>
                <Select.Option key={60}>60分钟</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="提取数">
              <InputNumber step={1}></InputNumber>
            </Form.Item>
            <Form.Item label={<span>&nbsp;</span>} colon={false}>
              <Button htmlType="submit" type="primary">
                生成代理
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
      <div>
        <Input.TextArea rows={8}></Input.TextArea>
      </div>
    </div>
  );
};

export default AgentBuildPage;
