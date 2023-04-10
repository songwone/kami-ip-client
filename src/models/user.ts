import { useEffect, useState } from 'react';
import { getUserInfo } from '@/api/user';

export default () => {
  const [user, setUser] = useState({
    pageNo: null,
    pageSize: null,
    id: 0,
    userName: 'liujian123',
    userPassword: null,
    newPassword: null,
    token: null,
    balance: 0,
    consumeAmt: null,
    email: '27145@qq.com',
    code: null,
    mobilePhone: '',
    userLevel: 0,
    status: 0,
    rechargePerm: 0,
    remark: '',
    createdDate: '',
    createdBy: '',
    baseUrl: null,
    loginIPAddr: null,
    roleName: null,
    ipTotal: 0,
    increaseIp: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, []);

  return {
    user,
    loading,
  };
};
