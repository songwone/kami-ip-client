/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:21:46
 * @LastEditors: songone
 * @LastEditTime: 2022-10-23 15:52:39
 * @FilePath: \kami-ip-management\routes.ts
 */
export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: './Login',
    menu: {
      hideInMenu: true,
      menuRender: false,
    },
    menuRender: false,
    layout: false,
  },
  {
    title: 'home.title',
    name: 'home',
    path: '/home',
    component: './Home',
  },
  {
    title: 'recharge.title',
    name: 'recharge',
    path: '/recharge',
    component: './Recharge',
    routes: [
      {
        title: 'recharge.title',
        name: 'rechargeOne',
        path: 'index',
        component: './Recharge',
      },
      {
        name: '充值记录',
        path: 'list',
        component: './Recharge/list',
      },
    ],
  },
  // {
  //   name: 'buy',
  //   path: '/buy',
  //   routes: [
  //     {
  //       name: 'index',
  //       title: 'buy',
  //       path: 'index',
  //       component: './Buy',
  //     },
  //     {
  //       name: 'record',
  //       path: 'list',
  //       component: './Buy/list',
  //     },
  //   ],
  // },
  {
    title: 'agent.title',
    name: 'agent',
    path: '/agent',
    routes: [
      {
        name: 'build',
        path: 'build',
        component: './Agent/build',
      },
      {
        name: 'subAccount',
        path: 'list',
        component: './Agent/sub-account',
      },
    ],
  },
];
