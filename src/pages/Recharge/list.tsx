/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:34:08
 * @LastEditors: one
 * @LastEditTime: 2023-04-04 19:53:59
 * @FilePath: \kami-ip-client\src\pages\Recharge\list.tsx
 */
import { useEffect, useState } from 'react';
import { Table, TableColumnType, PaginationProps } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { getRechargeRecord } from '@/api/process';

type ItemType = {
  userName: string;
  amount: number;
  createdDate: string;
  rechargeStatus: 0 | 1 | 2 | 3;
};
const RechargeListPage: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [listData, setListData] = useState<{
    rows: ItemType[];
    total: number;
  }>({
    rows: [],
    total: 0,
  });

  const getData = async () => {
    try {
      const result = await getRechargeRecord(searchForm);
      console.log('🚀 ~ file: list.tsx:25 ~ getData ~ result:', result);
      setListData(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [searchForm]);
  const columns: TableColumnType<any>[] = [
    {
      dataIndex: 'id',
      title: '序号',
      render: (text, record, index) => (
        <div>{(searchForm.pageNo - 1) * searchForm.pageSize + index + 1}</div>
      ),
    },
    { dataIndex: 'userName', title: '用户名' },
    { dataIndex: 'amount', title: '充值金额' },
    { dataIndex: 'createdDate', title: '时间' },
    {
      dataIndex: 'rechargeStatus',
      title: '充值状态',
      render: (text) => {
        const statusText = [
          '已下单未付款',
          '已付款未收账',
          '已付款已收账',
          '失败',
        ];
        return <div>{statusText[text]}</div>;
      },
    },
  ];
  const pagination: PaginationProps = {
    total: listData.total,
    pageSize: searchForm.pageSize,
    current: searchForm.pageNo,
    onChange(page, pageSize) {
      setSearchForm({
        ...searchForm,
        pageNo: page,
        pageSize: pageSize || 10,
      });
    },
  };
  return (
    <PageContainer
      className="page-container"
      title="充值记录"
      header={{
        extra: [],
      }}
    >
      <Table
        columns={columns}
        dataSource={listData.rows}
        pagination={pagination}
      ></Table>
    </PageContainer>
  );
};

export default RechargeListPage;
