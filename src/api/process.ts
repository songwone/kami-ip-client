/*
 * @Descripttion: 流程相关的接口
 * @version:
 * @Author: songone
 * @Date: 2022-10-29 14:31:59
 * @LastEditors: one
 * @LastEditTime: 2023-04-06 21:58:33
 * @FilePath: \kami-ip-client\src\api\process.ts
 */
import { request } from '@umijs/max';

// 充值余额
export const addRecharge = (packageCode: any) =>
  request('/light-ip/recharge/add', {
    params: { packageCode },
    method: 'get',
  });

// 充值记录
export const getRechargeRecord = (params: any) =>
  request('/light-ip/recharge/query', { params, method: 'get' });

// 创建订单
export const createOrder = (data: {
  produceCode: string;
  unitPrice: number;
  traffic: number;
  totalPrice: number;
  discount: number;
}) =>
  request('/light-ip/residential/dynamic/createOrder', {
    data,
    method: 'post',
  });
// data: {
//   produceCode: string;
//   unitPrice: number;
//   traffic: number;
//   totalPrice: number;
//   discount: number;
// }
// 获取套餐信息
export const getPackageList = () =>
  request('/light-ip/recharge/getPackage', {
    method: 'get',
  });

export const getOrderStatus = (rechargeNo: string) =>
  request('/light-ip/recharge/update', {
    method: 'get',
    params: { rechargeNo },
  });

// 获取代理国家/州/城市
export const getCountryList = (params: {
  codeType: number;
  countryCode?: string;
}) => request('/light-ip/account/getCountryList', { params, method: 'get' });

// 获取代理单价
export const getAgentPrice = (params: {
  codeType: number;
  countryCode?: string;
}) => request('/light-ip/account/getAgentPrice', { params, method: 'get' });
