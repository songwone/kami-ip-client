/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-16 16:21:46
 * @LastEditors: one
 * @LastEditTime: 2023-04-10 23:34:50
 * @FilePath: \kami-ip-client\routes.ts
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
    routes: [
      {
        title: 'recharge.title',
        name: 'rechargeOne',
        path: 'index',
        component: './Recharge',
      },
      {
        title: 'rechargeList.title',
        name: 'rechargeList',
        path: 'list',
        component: './Recharge/list',
      },
      {
        path: '',
        redirect: '/recharge/index',
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
    component: './Agent/build',
    // routes: [
    //   {
    //     title: 'buildAgent.title',
    //     name: 'buildAgent',
    //     path: 'build',
    //     component: './Agent/build',
    //   },
    //   {
    //     title: 'subAccount.title',
    //     name: 'subAccount',
    //     path: 'sub-account',
    //     component: './Agent/sub-account',
    //   },
    // ],
  },
];
