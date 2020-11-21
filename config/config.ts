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
    name: '可信数据共享应用',
    locale: true,
    siderWidth: 208,
    logo: '../../logo.svg',
  },
  locale: {
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: false,
    baseNavigator: false,
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
    {
      path: '/isc',
      layout: false,
      routes: [
        {
          name: 'isc',
          path: '/isc',
          component: './isc',
        },
      ],


    },
    {
      path: '/dataConfirm',
      name: 'dataConfirm',
      icon: 'save',
      routes: [
        {
          path: '/dataConfirm/assetIdentifier',
          name: 'assetIdentifier',
          component: './dataConfirm/assetIdentifier',
          access: 'canUserOrAdmin'
        },
        {
          path: '/dataConfirm/assetProof',
          name: 'assetProof',
          component: './dataConfirm/assetProof',
          access: 'canUserOrAdmin'
        },
        {
          path: '/dataConfirm/dataUsage',
          name: 'dataUsage',
          component: './dataConfirm/dataUsage',
          access: 'canUserOrAdmin'
        },
      ],
    },
    {
      path: '/dataOnChain',
      name: 'dataOnChain',
      icon: 'inbox',
      routes: [
        {
          path: '/dataOnChain/onChainRequests',
          name: 'onChainRequests',
          component: './dataOnChain/onChainRequests',
          access: 'canUserOrAdmin'
        },
        {
          path: '/dataOnChain/onChainApproval',
          name: 'onChainApproval',
          component: './dataOnChain/onChainApproval',
          access: 'canAdmin',
        },
        {
          path: '/dataOnChain/dataType',
          name: 'dataType',
          component: './dataOnChain/dataType',
          access: 'canUserOrAdmin'
        },
      ],
    },
    {
      path: '/dataShareComment',
      name: 'dataShareComment',
      icon: 'cloud',
      access: 'canAdmin',
      routes: [
        {
          path: '/dataShareComment/model',
          name: 'model',
          component: './dataShareComment/model',
          access: 'canAdmin',
        },
        {
          path: '/dataShareComment/token',
          name: 'token',
          component: './dataShareComment/token',
          access: 'canAdmin',
        },
      ],
    },
    {
      path: '/dataLifeCycle',
      name: 'dataLifeCycle',
      icon: 'appstore',
      routes: [
        {
          path: '/dataLifeCycle/dataTraceability',
          name: 'dataTraceability',
          component: './dataLifeCycle/dataTraceability',
          access: 'canUserOrAdmin'
        },
        {
          path: '/dataLifeCycle/dataRightConfirmInfo',
          name: 'dataRightConfirmInfo',
          component: './dataLifeCycle/dataRightConfirmInfo',
          access: 'canUserOrAdmin'
        },
        {
          path: '/dataLifeCycle/dataRouter',
          name: 'dataRouter',
          component: './dataLifeCycle/dataRouter',
          access: 'canUserOrAdmin'
        },
        {
          path: '/dataLifeCycle/analysis',
          name: 'analysis',
          component: './dataLifeCycle/analysis',
          access: 'canUserOrAdmin'
        },
      ],
    },
    {
      path: '/chainMng',
      name: 'chainMng',
      icon: 'link',
      routes: [
        {
          path: '/chainMng/keyMng',
          name: 'keyMng',
          component: './chainMng/keyMng',
          access: 'canAdmin',
        },
        {
          path: '/chainMng/explorer',
          name: 'explorer',
          component: './chainMng/explorer',
          access: 'canUserOrAdmin'
        },
      ],
    },
    {
      path: '/auditLog',
      name: 'auditLog',
      icon: 'book',
      routes: [
        {
          path: '/auditLog/runningLog',
          name: 'runningLog',
          component: './auditLog/runningLog',
          access: 'canAudit',
        },
        {
          path: '/auditLog/debugLog',
          name: 'debugLog',
          component: './auditLog/debugLog',
          access: 'canAudit',
        },
        {
          path: '/auditLog/errorLog',
          name: 'errorLog',
          component: './auditLog/errorLog',
          access: 'canAudit',
        },
        {
          path: '/auditLog/logSwitch',
          name: 'logSwitch',
          component: './auditLog/logSwitch',
          access: 'canAudit',
        }
      ],
    },

    /*
    {
      path: '/',
      redirect: '/dataConfirm/assetIdentifier',
    },
    */
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
