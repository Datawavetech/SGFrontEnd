/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { history } from 'umi';

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


/*
var params = GetRequest();
var ticket = params.ticket;
var nocestrs = [];
if (ticket) {
    login(ticket);
} else {
    loadPermission();
}
*/

/*
var GetRequest = function() {
    var url = window.location.search;
    var strs = [];
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
*/

request.interceptors.request.use((url, options) => {
  const currentUserStr = localStorage.getItem('tdsp');
  let currentUser: API.CurrentUser = {};
  if (currentUserStr != null) {
    currentUser = JSON.parse(currentUserStr);
    if (currentUser.token === undefined || currentUser.token === null) {
      message.error("登录异常，请重新登录");
      history.push('/user/login');
    }
    const headers = {
      Authorization: `${currentUser.token}`,
    };
    return ({
      url,
      options: { ...options, headers },
    });
  }
  history.push('/user/login');
  return ({});
})

// 对于请求返回的统一处理
request.interceptors.response.use(async (response: any) => {
  const data = await response.clone().json();
  if (data === undefined || data === null) {
    return response;
  }
  // 查询参数错误或写入参数异常
  if (data.status === 422) {
    if (data.data !== undefined && data.message !== null) {
      throw message.error(data.message);
    }
  } else if (data.status === 401) { // 未登录或登录超时，统一跳转到登录页面
    history.push('/user/login');
    message.error("登录超时，请重新登录");
  } else if (data.status === 402) {
    throw message.error("用户权限不足");
  } else if (data.status === 500) {
    if (data.data !== undefined && data.message !== null) {
      throw message.error(data.message);
    }
  }
  return response;
});

export default request;
