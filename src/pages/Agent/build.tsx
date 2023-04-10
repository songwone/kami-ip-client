/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:27:34
 * @LastEditors: one
 * @LastEditTime: 2023-04-10 22:24:42
 * @FilePath: \kami-ip-client\src\pages\Agent\build.tsx
 */
import {
  Form,
  Select,
  Input,
  Radio,
  Button,
  Row,
  Col,
  InputNumber,
  message,
} from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import SelectRegion from '@/components/SelectRegion/SelectRegion';
import { useModel } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import { getAgentPrice } from '@/api/process';
import { createAgentCommand } from '@/utils';
import ClipboardJS from 'clipboard';

const AgentBuildPage: React.FC = () => {
  const {
    user: { userName, token },
  } = useModel('user');
  console.log('🚀 ~ file: build.tsx:21 ~ userName:', useModel('user'));
  const [form] = Form.useForm();

  const [type, setType] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  // const [agentStrList, setAgentStrList] = useState(['']);
  const [agentStr, setAgentStr] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);

  const onTypeChange = (e: any) => {
    setType(e.target.value);
    if (e.target.value === 1) {
      form.setFieldsValue({
        duration: '随机',
      });
    } else {
      form.setFieldsValue({
        duration: 5,
      });
    }
  };
  const getPrice = (codeType: any) => {
    getAgentPrice({
      codeType,
    }).then((res) => {
      console.log('🚀 ~ file: build.tsx:57 ~ onRegionChange ~ res:', res);
      setUnitPrice(res.data);
    });
  };
  const onRegionChange = (value: any) => {
    const [country, state, city] = value || [];
    // 随机
    let codeType = 0;
    // 精确到城市
    if (country && state && city) {
      codeType = 3;
    }
    // 精确到州
    if (country && state && !city) {
      codeType = 2;
    }
    // 精确到国家
    if (country && !state && !city) {
      codeType = 1;
    }
    getPrice(codeType);
  };
  const handleBuild = (values: any) => {
    const { region, protocol, duration, count } = values;
    const [country, state, city] = region || [];
    let str = '';
    if (type === 2) {
      for (let i = 0; i < count; i++) {
        const s = createAgentCommand(
          {
            username: userName,
            country,
            state,
            city,
            duration,
            protocol,
            token,
          },
          type,
        );
        str += s + '\n';
      }
    } else {
      str = createAgentCommand(
        {
          username: userName,
          country,
          state,
          city,
          duration,
          protocol,
          token,
        },
        type,
      );
    }
    setCopyStatus(false);
    setAgentStr(str);
  };

  const copySuccess = () => {
    message.success('已复制');
    setCopyStatus(true);
  };
  useEffect(() => {
    getPrice(0);
    const clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function () {
      copySuccess();
    });
  }, []);
  const durationList = [
    { value: 0, label: '随机' },
    { value: 5, label: '5分钟' },
    { value: 10, label: '10分钟' },
    { value: 15, label: '15分钟' },
    { value: 20, label: '20分钟' },
    { value: 25, label: '25分钟' },
    { value: 30, label: '30分钟' },
  ];
  return (
    <PageContainer ghost>
      <div className="page-container">
        <Form
          form={form}
          initialValues={{ protocol: 'http', count: 1, username: userName }}
          onFinish={handleBuild}
          style={{ width: 300 }}
        >
          <Form.Item label="账户" name="username">
            <Input type="text" readOnly />
          </Form.Item>
          <Form.Item label="地区" name="region">
            <SelectRegion
              onChange={onRegionChange}
              clearIcon={false}
            ></SelectRegion>
          </Form.Item>
          <Form.Item label="协议" name="protocol">
            <Radio.Group>
              <Radio value="http">http</Radio>
              <Radio value="https">https</Radio>
              <Radio value="http/https">http/https</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="轮换类型"
            name="type"
            rules={[{ required: true, message: '请选择轮换类型' }]}
          >
            <Radio.Group onChange={onTypeChange}>
              <Radio value={1}>轮换</Radio>
              <Radio value={2}>粘性</Radio>
            </Radio.Group>
          </Form.Item>
          {type === 1 && (
            <Form.Item label="IP时长" name="duration">
              <Input readOnly></Input>
            </Form.Item>
          )}
          {type === 2 && (
            <Form.Item label="IP时长" name="duration">
              <Select>
                {durationList.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item label="生成条数" name="count">
            <InputNumber
              min={1}
              max={100}
              step={1}
              precision={0}
              decimalSeparator=""
            ></InputNumber>
          </Form.Item>
          <Form.Item label="单价">
            <div> {unitPrice} 美元/G</div>
          </Form.Item>
          <Form.Item label={<span>&nbsp;</span>} colon={false}>
            <Button htmlType="submit" type="primary" size="large">
              生成代理
            </Button>
          </Form.Item>
        </Form>
        <Row gutter={20}>
          <Col span={20}>
            <Input.TextArea
              id="agent-content"
              style={{ fontSize: 24 }}
              value={agentStr}
              rows={6}
            ></Input.TextArea>
          </Col>
          <Col span={4}>
            <Button
              className="btn"
              data-clipboard-target="#agent-content"
              type="primary"
              size="large"
              icon={copyStatus ? <CheckOutlined /> : <CopyOutlined />}
            >
              {copyStatus ? '已复制' : '复制'}
            </Button>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default AgentBuildPage;
