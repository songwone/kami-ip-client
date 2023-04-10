/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-17 22:21:12
 * @LastEditors: one
 * @LastEditTime: 2023-04-10 22:56:08
 * @FilePath: \kami-ip-client\src\components\Header\index.tsx
 */
import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { SelectLang, useLocation, useModel } from '@umijs/max';
import { logout } from '@/api/user';
import ModifyPassword from './ModifyPassword';

type propsType = {
  state: any;
};
const Header: React.FC<propsType> = ({ state }) => {
  const {
    user: { balance },
  } = useModel('user');
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
      <div>
        <Space>
          <div style={{ padding: '0 20px', fontSize: 16, fontWeight: 'bold' }}>
            账户余额: {balance || 0}
          </div>
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
      </div>
      <ModifyPassword open={modifyPasswordOpen}></ModifyPassword>
    </div>
  );
};

export default Header;
