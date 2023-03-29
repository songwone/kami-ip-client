import Cookies from 'js-cookie';

export const setToken = (token: string) => {
  Cookies.set('_TOKEN', token);
};

export const getToken = () => {
  return Cookies.get('_TOKEN') || '';
};

export const removeToken = () => {
  return Cookies.remove('_TOKEN');
};
