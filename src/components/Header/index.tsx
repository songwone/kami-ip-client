/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-17 22:21:12
 * @LastEditors: one
 * @LastEditTime: 2023-03-04 16:19:36
 * @FilePath: \kami-ip-management\src\components\Header\index.tsx
 */
import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { SelectLang, useLocation } from '@umijs/max';
import { logout } from '@/api/user';
import ModifyPassword from './ModifyPassword';

type propsType = {
  state: any;
};
const Header: React.FC<propsType> = ({ state }) => {
  const location = useLocation();
  const [modifyPasswordOpen, setModifyPasswordOpen] = useState(false);
  const { userInfo } = state;
  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'modify-password') {
      setModifyPasswordOpen(true);
    }
    if (key === 'logout') {
      logout();
    }
  };
  const menu = (
    <Menu
      items={[
        {
          key: 'modify-password',
          label: '修改登录密码',
        },
        {
          key: 'logout',
          label: '安全退出',
        },
      ]}
      onClick={handleMenuClick}
    ></Menu>
  );
  return (
    <div>
      <Space>
        <SelectLang reload={true}></SelectLang>
        {location.pathname !== '/login' && (
          <Dropdown overlay={menu}>
            <Space>
              <Avatar style={{ backgroundColor: 'orange' }}>U</Avatar>
              <span>{userInfo.name}</span>
            </Space>
          </Dropdown>
        )}
      </Space>
      <ModifyPassword open={modifyPasswordOpen}></ModifyPassword>
    </div>
  );
};

export default Header;
