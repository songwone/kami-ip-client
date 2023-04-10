import { request } from '@umijs/max';

// 充值余额
export const getCountryStatistic = (params: any) =>
  request('/light-ip/account/getCountry', {
    params,
    method: 'get',
  });
