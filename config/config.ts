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
    }, // {
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
      path: '/dataConfirm',
      name: 'dataConfirm',
      icon: 'smile',
      // component: './Welcome',
      routes: [
        {
          path: '/dataConfirm/assetIdentifier',
          name: 'assetIdentifier',
          icon: 'smile',
          component: './dataConfirm/assetIdentifier',
        },
        {
          path: '/dataConfirm/assetProof',
          name: 'assetProof',
          icon: 'smile',
          component: './dataConfirm/assetProof',
        },
        {
          path: '/dataConfirm/dataUsage',
          name: 'dataUsage',
          icon: 'smile',
          component: './dataConfirm/dataUsage',
        },
      ],
    },
    {
      path: '/dataOnChain',
      name: 'dataOnChain',
      icon: 'smile',
      // component: './Welcome',
      routes: [
        {
          path: '/dataOnChain/onChainRequests',
          name: 'onChainRequests',
          icon: 'smile',
          component: './dataOnChain/onChainRequests',
        },
        {
          path: '/dataOnChain/onChainApproval',
          name: 'onChainApproval',
          icon: 'smile',
          component: './dataOnChain/onChainApproval',
        },
      ],
    },
    {
      path: '/dataShareComment',
      name: 'dataShareComment',
      icon: 'smile',
      // component: './Welcome',
      routes: [
        {
          path: '/dataShareComment/model',
          name: 'model',
          icon: 'smile',
          component: './dataShareComment/model',
        },
        {
          path: '/dataShareComment/token',
          name: 'token',
          icon: 'smile',
          component: './dataShareComment/token',
        },
      ],
    },
    {
      path: '/dataLifeCycle',
      name: 'dataLifeCycle',
      icon: 'smile',
      // component: './Welcome',
      routes: [
        {
          path: '/dataLifeCycle/duringChain',
          name: 'duringChain',
          icon: 'smile',
          component: './dataLifeCycle/duringChain',
        },
        {
          path: '/dataLifeCycle/analysis',
          name: 'analysis',
          icon: 'smile',
          component: './dataLifeCycle/analysis',
        },
      ],
    },
    {
      path: '/chainMng',
      name: 'chainMng',
      icon: 'smile',
      // component: './Welcome',
      routes: [
        {
          path: '/chainMng/keyMng',
          name: 'keyMng',
          icon: 'smile',
          component: './chainMng/keyMng',
        },
        {
          path: '/chainMng/explorer',
          name: 'explorer',
          icon: 'smile',
          component: './chainMng/explorer',
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
      redirect: '/dataConfirm/assetIdentifier',
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
