import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType, PaginationProps } from 'antd';
import { useIntl, useModel } from '@umijs/max';
import { StatisticCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { getCountryStatistic } from '@/api/statistic';
import WithAuth from '@/components/withAuth';

const HomePage: React.FC = () => {
  const {
    user: { ipTotal, increaseIp, balance },
  } = useModel('user');
  const intl = useIntl();
  const [countryListData, setCountryListData] = useState({
    rows: [] as any,
    total: 0,
  });
  const [postForm, setPostForm] = useState({
    pageNo: 1,
    pageSize: 10,
    codeType: 1,
  });

  const getData = async () => {
    try {
      const result = await getCountryStatistic(postForm);
      console.log('🚀 ~ file: index.tsx:16 ~ getData ~ result:', result);
      setCountryListData(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [postForm]);
  const pagination: PaginationProps = {
    total: countryListData.total,
    pageSize: postForm.pageSize,
    current: postForm.pageNo,
    onChange(page, pageSize) {
      setPostForm({
        ...postForm,
        pageNo: page,
        pageSize: pageSize || 10,
      });
    },
    showSizeChanger: false,
    showQuickJumper: true,
  };
  const columns: TableColumnsType<any> = [
    {
      dataIndex: 'countryCn',
      title: intl.formatMessage({
        id: 'Country',
      }),
    },
    {
      dataIndex: 'countryCode',
      title: intl.formatMessage({
        id: 'Code',
      }),
    },
    {
      dataIndex: 'ipCount',
      title: intl.formatMessage({
        id: 'NumberOfIPs',
      }),
    },
    {
      dataIndex: 'networkStatus',
      title: intl.formatMessage({
        id: 'NetworkStatus',
      }),
    },
  ];
  return (
    <PageContainer ghost>
      <StatisticCard.Group direction={'row'}>
        <StatisticCard
          statistic={{
            title: intl.formatMessage({
              id: 'TotalDynamicResidentialIP',
            }),
            value: ipTotal,
          }}
        />
        <StatisticCard
          statistic={{
            title: intl.formatMessage({
              id: 'NewDayNewQualityIP',
            }),
            value: increaseIp || 0,
            // description: <Statistic title="占比" value="61.5%" />,
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: intl.formatMessage({
              id: 'AccountBalance',
            }),
            value: balance,
            // description: <Statistic title="占比" value="38.5%" />,
          }}
          chartPlacement="left"
        />
      </StatisticCard.Group>
      <Table
        columns={columns}
        dataSource={countryListData.rows}
        style={{ marginTop: 20 }}
        pagination={pagination}
        size="small"
        bordered
      ></Table>
    </PageContainer>
  );
};

export default WithAuth(HomePage);
