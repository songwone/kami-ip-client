/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:28:02
 * @LastEditors: songone
 * @LastEditTime: 2022-10-29 14:41:58
 * @FilePath: \kami-ip-management\src\pages\Buy\list.tsx
 */
import { useEffect, useState } from 'react';
import { Table, TableColumnType } from 'antd';
import { PageContainer } from '@ant-design/pro-components';

const BuyListPage: React.FC = () => {
  const [listData, setListData] = useState({
    rows: [],
    total: 0,
  });
  const getData = async () => {
    try {
      const result = {
        rows: [],
        total: 0,
      };
      setListData(result);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  const columns: TableColumnType<any>[] = [
    { dataIndex: 'index', title: '序号' },
    { dataIndex: 'userName', title: '用户名' },
    { dataIndex: 'subAccount', title: '子账户' },
    { dataIndex: 'produceCode', title: '产品详情' },
    { dataIndex: 'totalPrice', title: '金额' },
    { dataIndex: 'unitPrice', title: '单价' },
    { dataIndex: 'traffic', title: '流量数' },
    { dataIndex: 'discount', title: '折扣' },
    { dataIndex: 'createdDate', title: '时间' },
    { dataIndex: 'orderStatus', title: '交易状态' },
  ];
  return (
    <PageContainer
      className="page-container"
      title="购买记录"
      header={{
        extra: [],
      }}
    >
      <Table columns={columns} dataSource={listData.rows}></Table>
    </PageContainer>
  );
};

export default BuyListPage;
