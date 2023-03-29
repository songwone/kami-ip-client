import { useEffect, useState } from 'react';
import { getUserInfo } from '@/api/user';

export default () => {
  const [user, setUser] = useState<{
    id?: string;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then((res) => {
      setUser(res);
      setLoading(false);
    });
  }, []);

  return {
    user,
    loading,
  };
};
