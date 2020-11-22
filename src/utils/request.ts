/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { history } from 'umi';
import { login, loginISC, loadPermission } from '@/services/login';
import { encrypt } from '@/utils/utils';

//

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
// const errorHandler = (error: { response: Response }): Response => {
//   console.log('error:', error)
//   const { response } = error;
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;

//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   } else if (!response) {
//     notification.error({
//       description: '您的网络发生异常，无法连接服务器',
//       message: '网络异常',
//     });
//   }
//   return response;
// };

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});


const GetRequest = () => {
  let url = window.location.search;
  let strs = [];
  let theRequest = {};
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


request.interceptors.request.use((url, options) => {
  const params = GetRequest();
  console.log(params)
  let ticket = params.ticket // "ST-41-0NuSQsXWOZg1OTopyI9F-isc.sgcc.com.cn"; //

  const currentUserStr = localStorage.getItem('tdsp');
  let currentUser: API.CurrentUser = JSON.parse(currentUserStr);
  let token = currentUser ? currentUser.token : null
  console.log(currentUser)
  alert(`请求拦截器ticket & token：${ticket} / ${token}`)
  const encryptedTimestamp = encrypt(new Date().getTime().toString());
  alert(`time:${encryptedTimestamp}`)
  if (ticket && !token) {
    console.log("ticket exists:", ticket)
    const headers = {
      Authorization: `${token}`, //`F774CA755A4EB4B14BD3DE087286C5B269FF411B9989BFDBE8A7049CE46016FB`,//
      Timestamp: encryptedTimestamp,
    };
    return ({
      url: `/api/user/isc-login?ticket=${ticket}`,
      options: { ...options, headers },
    });
  }
  else {
    console.log("ticket missing or token exists:", ticket)
    const headers = {
      Authorization: token, //`F774CA755A4EB4B14BD3DE087286C5B269FF411B9989BFDBE8A7049CE46016FB`,//
      Timestamp: encryptedTimestamp
    };
    return ({
      url,
      options: { ...options, headers },
    });
  }
})

// 对于请求返回的统一处理
request.interceptors.response.use(async (response: any) => {
  const data = await response.clone().json();
  console.log(data)
  alert(`返回拦截器：${JSON.stringify(data)}`)
  if (data === undefined || data === null) {
    return response;
  }
  // 查询参数错误或写入参数异常
  if (data.status === 422) {
    if (data.data !== undefined && data.message !== null) {
      throw message.error(data.message);
    }
  } else if (data.status === 401) { // 未登录或登录超时，统一跳转到登录页面
    if (data.redirect) {
      //history.push(data.redirect);
      localStorage.removeItem('tdsp')
      window.location.href = data.redirect
      throw message.error("状态异常，请重新登录");
      //GAVIN TODO 清理缓存
    }
    else {
      message.error("跳转页面异常或访问越权")
    }
  } else if (data.status === 402) {
    throw message.error("用户权限不足");
  } else if (data.status === 500) {
    if (data.data !== undefined && data.message !== null) {
      throw message.error(data.message);
    }
  } else if (data.status === 208) { // 登陆ISC返回的状态
    message.success('登录成功!');
    alert(`Token 写入: ${JSON.stringify(data.data)}`)
    localStorage.setItem('tdsp', JSON.stringify(data.data));

  }
  return response;
});

export default request;
