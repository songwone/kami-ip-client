import React from 'react';
import { Navigate, Outlet } from 'umi';
import { getToken } from '@/utils/auth';

export default () => {
  // const { user } = useModel('userModel');
  // console.log('🚀 ~ file: auth.tsx:7 ~ user:', user);
  const token = getToken();
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
