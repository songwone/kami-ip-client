/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-22 18:37:11
 * @LastEditors: songone
 * @LastEditTime: 2022-10-29 14:37:47
 * @FilePath: \kami-ip-management\src\pages\Buy\index.tsx
 */
import { Row, Col, Button, Form, Select, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';

const BuyPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const handleChange = (index: number) => {
    setCurrent(index);
  };
  const handlePost = async () => {};
  const handleSubmit = () => {
    Modal.confirm({
      content: <div>确定花费$7购买1G流量吗（城市级）</div>,
      onOk: () => {
        handlePost();
      },
    });
  };
  const packageList = [
    {
      name: '基础套餐',
      flow: 1,
      price: 7,
      unitPrice: 7,
    },
    {
      name: '最佳套餐',
      flow: 10,
      price: 65,
      unitPrice: 6.5,
    },
    {
      name: '豪华套餐',
      flow: 10,
      price: 65,
      unitPrice: 6.5,
    },
  ];
  return (
    <PageContainer
      className="page-container"
      header={{
        title: '请选择套餐',
      }}
      ghost
    >
      <div className="product-list">
        {packageList.map((product: any, index: number) => (
          <div key={index} className="product-card">
            <div className="product-name">{product.name}</div>
            <div className="product-flow">流量: {product.flow}GB</div>
            <div className="product-price">{product.price} $</div>
            <div className="product-unit-price">{product.unitPrice} $/G</div>
            <div className="handle-wrap">
              {index === current ? (
                <Button size="middle" disabled type="primary">
                  已选择
                </Button>
              ) : (
                <Button
                  size="middle"
                  type="primary"
                  onClick={() => handleChange(index)}
                >
                  选择这个
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Row style={{ marginTop: 30 }}>
        <Col span={6}>
          <Form>
            <Form.Item label="选择城市">
              <Select placeholder="请选择城市"></Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                立即购买
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default BuyPage;
