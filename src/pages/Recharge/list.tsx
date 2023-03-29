/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:34:08
 * @LastEditors: songone
 * @LastEditTime: 2022-10-23 15:24:40
 * @FilePath: \kami-ip-management\src\pages\Recharge\list.tsx
 */
import { useState } from 'react';
import { Table, TableColumnType, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import PayModal from './components/pay';

const RechargeListPage: React.FC = () => {
  const [payVisible, setPayVisible] = useState(false);
  const handleRecharge = () => {
    setPayVisible(true);
  };
  const columns: TableColumnType<any>[] = [
    { dataIndex: 'index', title: '序号' },
    { dataIndex: 'name', title: '用户名' },
    { dataIndex: 'number', title: '充值金额' },
    { dataIndex: 'time', title: '时间' },
    { dataIndex: 'status', title: '充值状态' },
  ];
  return (
    <PageContainer
      className="page-container"
      title="充值记录"
      header={{
        extra: [
          <Button key="recharge" type="primary" onClick={handleRecharge}>
            充值
          </Button>,
        ],
      }}
    >
      <Table columns={columns}></Table>
      <PayModal
        open={payVisible}
        onCancel={() => setPayVisible(false)}
      ></PayModal>
    </PageContainer>
  );
};

export default RechargeListPage;
