/*
 * @Descripttion: 流程相关的接口
 * @version:
 * @Author: songone
 * @Date: 2022-10-29 14:31:59
 * @LastEditors: songone
 * @LastEditTime: 2022-10-29 14:33:01
 * @FilePath: \kami-ip-management\src\api\process.ts
 */
import { request } from '@umijs/max';

// 充值余额
export const addRecharge = (packageCode: any) =>
  request('/light-ip/recharge/add', {
    params: { packageCode },
    method: 'get',
  });

// 充值余额
export const getRechargeRecord = (params: any) =>
  request('/light-ip/user/login', { params, method: 'get' });

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
