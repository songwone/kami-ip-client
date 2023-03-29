/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-11-08 22:11:07
 * @LastEditors: songone
 * @LastEditTime: 2022-11-22 22:43:31
 * @FilePath: \kami-ip-management\src\pages\Agent\sub-account.tsx
 */
import { useEffect, useState } from 'react';
import { Table, TableColumnType, Button, PaginationProps } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { defaultSearchForm, DefaultSearchFormType } from '@/utils/constans';

import AddAccountModal from './components/addAccountModal';

type SearchFormType = DefaultSearchFormType & {
  a?: string;
};
const BuyListPage: React.FC = () => {
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    ...defaultSearchForm,
  });
  const [listData, setListData] = useState({
    rows: [],
    total: 0,
  });
  const [addVisible, setAddVisible] = useState(false);

  const getData = async () => {
    setListData({
      rows: [],
      total: 0,
    });
  };
  const handleAdd = () => {
    setAddVisible(true);
  };

  useEffect(() => {
    getData();
  }, [searchForm]);

  const columns: TableColumnType<any>[] = [
    { dataIndex: 'index', title: '序号' },
    { dataIndex: 'userName', title: '子账户' },
    { dataIndex: 'subAccount', title: '协议' },
    { dataIndex: 'produceCode', title: '范围' },
    { dataIndex: 'totalPrice', title: '剩余流量' },
    { dataIndex: 'unitPrice', title: '操作' },
  ];
  const pagination: PaginationProps = {
    total: listData.total,
    onChange(page: number, size: number) {
      setSearchForm({
        ...searchForm,
        pageNo: page,
        pageSize: size,
      });
    },
  };
  return (
    <PageContainer
      className="page-container"
      title="子账户管理"
      header={{
        extra: [],
      }}
    >
      <div>
        <Button type="primary" onClick={handleAdd}>
          新建子账户
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listData.rows}
        pagination={pagination}
      ></Table>
      <AddAccountModal
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
      ></AddAccountModal>
    </PageContainer>
  );
};

export default BuyListPage;
