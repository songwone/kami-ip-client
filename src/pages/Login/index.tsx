/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:33:30
 * @LastEditors: songone
 * @LastEditTime: 2022-10-23 22:32:39
 * @FilePath: \kami-ip-management\src\pages\Login\index.tsx
 */
import React from 'react';
import { history } from '@umijs/max';
import './index.less';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/api/user';
import { setToken } from '@/utils/auth';

const Login = () => {
  const handleLogin = async (values: any) => {
    // const { username, password } = values;
    try {
      const result = await login(values);
      setToken(result.data);
      history.replace('/home');
    } catch (error) {}
  };

  return (
    <div className="page-container">
      <div className="login-wrap">
        <h2 className="login-title">Kami系统登录</h2>
        <Form size="large" onFinish={handleLogin}>
          <Form.Item name="userName">
            <Input
              prefix={<UserOutlined></UserOutlined>}
              placeholder="账号"
            ></Input>
          </Form.Item>
          <Form.Item name="userPassword">
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="密码"
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
