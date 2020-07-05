// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },

    // {
    //   path: '/welcome',
    //   name: 'welcome',
    //   icon: 'smile',
    //   component: './Welcome',
    // },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //   ],
    // },
    {
      path: '/data-confirm',
      name: 'data-confirm',
      icon: 'smile',
      component: './Welcome',
      routes: [
        {
          path: '/data-confirm/proof',
          name: 'proof',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/data-confirm/management',
          name: 'management',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },

    {
      path: '/data-plus',
      name: 'data-plus',
      icon: 'smile',
      component: './Welcome',
      routes: [
        {
          path: '/data-plus/onchain',
          name: 'onchain',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/data-plus/evaluation',
          name: 'evaluation',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/data-plus/lifecycle',
          name: 'lifecycle',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },

    {
      path: '/blockchain',
      name: 'blockchain',
      icon: 'smile',
      component: './Welcome',
      routes: [
        {
          path: '/blockchain/key',
          name: 'key',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/blockchain/running',
          name: 'running',
          icon: 'smile',
          component: './Welcome',
        },
      ],
    },

    // {
    //   name: 'list.table-list',
    //   icon: 'table',
    //   path: '/list',
    //   component: './ListTableList',
    // },
    {
      path: '/',
      redirect: '/data-confirm',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
