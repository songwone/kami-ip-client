// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { RunTimeLayoutConfig, RequestConfig, history } from '@umijs/max';
import { getToken, removeToken } from './utils/auth';
import Footer from './components/Footer';
import Header from './components/Header';
import './assets/app.less';

export const request: RequestConfig = {
  timeout: 10000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (url, options) => {
      // do something
      const token = getToken();
      if (token) {
        options.headers.Token = token;
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    [
      (response) => {
        return response;
      },
      (error: any) => {
        // console.log('🚀 ~ file: app.tsx:40 ~ error:', error);
        if (error.response.status === 401) {
          removeToken();
          history.replace('/login');
        }
        return Promise.reject(error);
      },
    ],
  ],
};

export async function getInitialState(): Promise<{
  userInfo: {
    name: string;
    userName: string;
    balance: number;
    consumeAmt: number;
    userLevel: number;
    status: number;
  };
}> {
  return {
    userInfo: {
      name: 'kami',
      userName: '阿三',
      balance: 9999,
      consumeAmt: 1580,
      userLevel: 1,
      status: 1,
    },
  };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    footerRender: () => <Footer />,
    rightRender: (initialState: any) => <Header state={initialState}></Header>,
    layout: 'top',
    fixedHeader: true,
  };
};
