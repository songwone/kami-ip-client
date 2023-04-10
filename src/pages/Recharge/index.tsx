/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:47:17
 * @LastEditors: one
 * @LastEditTime: 2023-04-10 23:27:06
 * @FilePath: \kami-ip-client\src\pages\Recharge\index.tsx
 */
import { Button, Steps, Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import WithAuth from '@/components/withAuth';
import { useIntl, FormattedMessage } from '@umijs/max';
import { getPackageList, addRecharge } from '@/api/process';

import Pay from './components/pay';
import './index.less';

type PackageItemType = {
  amount: string;
  createdBy: string;
  createdDate: string;
  discount: string;
  dranUnitPrice: string;
  feeDesc: string;
  mobileUnitPrice: string;
  packageAmount: string;
  packageCode: string;
  packageDesc: string;
  remark: string;
  rracUnitPrice: number;
  rranUnitPrice: number;
  rsntUnitPrice: number;
  ruleId: string;
  subAccount: string;
  token: string;
  userName: string;
};

const RechargePage: React.FC = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [packageList, setPackageList] = useState<PackageItemType[]>([]);
  const [orderInfo, setOrderInfo] = useState<any>({});
  // const handlePost = async () => {
  //   setLoading(true);
  //   try {
  //     const params: {
  //       produceCode: string;
  //       unitPrice: number;
  //       traffic: number;
  //       totalPrice: number;
  //       discount: number;
  //     } = {
  //       produceCode: '',
  //       unitPrice: 0,
  //       traffic: 0,
  //       totalPrice: 0,
  //       discount: 0,
  //     };
  //     const result = await createOrder(params);
  //     console.log('🚀 ~ file: index.tsx:38 ~ handlePost ~ result:', result);
  //   } catch (error) {}
  //   setLoading(false);
  // };
  const handleSubmit = async (packageItem: PackageItemType) => {
    setLoading(true);
    try {
      const result = await addRecharge(packageItem.packageCode);
      setOrderInfo(result.data);
      setCurrent(1);
    } catch (error) {}
    setLoading(false);
  };
  const getList = async () => {
    try {
      const result = await getPackageList();
      setPackageList(result.data);
    } catch (error) {}
  };
  const handleSuccess = () => {
    setCurrent(2);
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <PageContainer className="page-container" ghost>
      <div style={{ margin: '0 auto' }}>
        <div style={{ padding: '20px' }}>
          <Steps current={current}>
            <Steps.Step title={intl.formatMessage({ id: 'ChooseAPackage' })} />
            <Steps.Step title={intl.formatMessage({ id: 'Recharge' })} />
            <Steps.Step title={intl.formatMessage({ id: 'Finish' })} />
          </Steps>
        </div>
        {current === 0 && (
          <div className="product-list">
            {packageList.map((product: any, index: number) => (
              <div key={index} className="product-card">
                <div className="product-name">{product.packageDesc}</div>
                {/* <div className="product-flow"><FormattedMessage id="Flow"></FormattedMessage>: {product.flow}GB</div> */}
                <div className="product-price">{product.packageAmount} $</div>
                <div className="product-desc">
                  <FormattedMessage id="DynamicResidentialIP"></FormattedMessage>
                  (<FormattedMessage id="Country"></FormattedMessage>)
                  <br />
                  {product.rranUnitPrice} $/G
                </div>
                <div className="product-desc">
                  <FormattedMessage id="DynamicResidentialIP"></FormattedMessage>
                  (<FormattedMessage id="CountryAndRegion"></FormattedMessage>)
                  <br />
                  {product.rracUnitPrice} $/G
                </div>
                <div className="handle-wrap">
                  {/* {index === current ? (
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
              )} */}
                  <Button
                    loading={loading}
                    type="primary"
                    onClick={() => handleSubmit(product)}
                    size="large"
                  >
                    <FormattedMessage id="Buy"></FormattedMessage>
                    {product.discount && '(' + product.discount * 100 + '%)'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {current === 1 && (
          <Pay orderInfo={orderInfo} onSuccess={handleSuccess}></Pay>
        )}
        {current === 2 && (
          <div style={{ padding: 50, textAlign: 'center', fontSize: 24 }}>
            <FormattedMessage id="RechargedSuccessfully"></FormattedMessage>
          </div>
        )}
        {/* <Row style={{ marginTop: 30 }}>
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
      </Row> */}
        <Row>
          <Col className="show-slogan" span={8}>
            2000w+住宅IP
          </Col>
          <Col className="show-slogan" span={8}>
            城市级定位
          </Col>
          <Col className="show-slogan" span={8}>
            自定义会话时长
          </Col>
          <Col className="show-slogan" span={8}>
            最简接入
          </Col>
          <Col className="show-slogan" span={8}>
            高速响应
          </Col>
          <Col className="show-slogan" span={8}>
            24/7 在线支持
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default WithAuth(RechargePage);
