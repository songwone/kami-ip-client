import React, { useEffect } from 'react';
import { Table, TableColumnsType } from 'antd';
import { useIntl } from '@umijs/max';
import { StatisticCard } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { getUserInfo } from '@/api/user';
import WithAuth from '@/components/withAuth';
// import { useModel } from '@umijs/max';
// const { Statistic } = StatisticCard;
const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  const intl = useIntl();

  const getData = async () => {
    try {
      const result = await getUserInfo();
      console.log('🚀 ~ file: index.tsx:16 ~ getData ~ result:', result);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  });

  const columns: TableColumnsType<any> = [
    {
      dataIndex: 'con',
      title: intl.formatMessage({
        id: 'Country',
      }),
    },
    {
      dataIndex: 'code',
      title: intl.formatMessage({
        id: 'Code',
      }),
    },
    {
      dataIndex: 'ipNumber',
      title: intl.formatMessage({
        id: 'NumberOfIPs',
      }),
    },
    {
      dataIndex: 'status',
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
            value: 601986875,
          }}
        />
        <StatisticCard
          statistic={{
            title: intl.formatMessage({
              id: 'NewDayNewQualityIP',
            }),
            value: 3701928,
            // description: <Statistic title="占比" value="61.5%" />,
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: intl.formatMessage({
              id: 'AccountBalance',
            }),
            value: 1806062,
            // description: <Statistic title="占比" value="38.5%" />,
          }}
          chartPlacement="left"
        />
      </StatisticCard.Group>
      <Table columns={columns} style={{ marginTop: 20 }}></Table>
    </PageContainer>
  );
};

export default WithAuth(HomePage);
