import { Navigate } from 'umi';
import { getToken } from '@/utils/auth';

const WithAuth = (Component: any) => () => {
  const token = getToken();
  if (token) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default WithAuth;
