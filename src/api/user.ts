/*
 * @Descripttion:
 * @version:
 * @Author: one
 * @Date: 2022-10-23 22:20:01
 * @LastEditors: one
 * @LastEditTime: 2023-03-04 15:34:13
 * @FilePath: \kami-ip-management\src\api\user.ts
 */
import { request } from '@umijs/max';

type LoginType = {
  userName: string;
  userPassword: string;
};
export const login = (data: LoginType) =>
  request('/light-ip/user/login', { data, method: 'post' });

type RegisterType = {
  userName: string;
  userPassword: string;
};
export const register = (data: RegisterType) =>
  request('/light-ip/user/register', { data, method: 'post' });

export const logout = () => request('/light-ip/user/logout', { method: 'get' });

type UpdatePasswordType = {
  userName: string;
  userPassword: string;
  newPassword: string;
};
export const updatePassword = (data: UpdatePasswordType) =>
  request('/light-ip/user/update', { data, method: 'post' });

export const getUserMenus = () =>
  request('/light-ip/user/getUserMenus', { method: 'get' });

export const getUserInfo = () =>
  request('/light-ip/account/query', { method: 'get' });
