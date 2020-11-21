/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { history } from 'umi';
import { login, loginISC, loadPermission } from '@/services/login';
import crypto from "crypto"

//const pubKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnK4Ujr1B/24bEKv3IguY43Bki89zmxVJi9xwIwgAUJ7tNvQ6SpYwaQpebzGdxVXywqB+4OEBbWCUAIpJVIoTgF0nVmQqTSiK8On1uNlQv5owsjCTsLqq/xtiHRjC8KFB/syiADZ1q/I6vP21GLdaWoFkDbDGqMaooDvEYzP9ZAsl6JNzpKEqoSP3FYP2gLgSL4JFmHsEjl5OrkZreJM46B42MxbTlXNNZ1ifXZiAwVa0m1GgYmMu2hv1J+lXoFZzY7ISEn8PKFa0aw/mU8dlsHXc0HZ64OGElqPoKZ1TMYovaGQ+vy3DykX+DgOEnYHFzMpB5OsoXHY5N3jEtEY9aQIDAQAB"

const pubKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkbwGZp06WqcCC86sN8jPQgn8NqYj7Tpq
Kd3l3SxkyHn/++yo5Dsu4fcBe9UtjzsIX6O7ySHJBlf/ViLId6EYCGDd6R2qUaAuhqGE9ojrHJou
W7VacvLdi7BN59aTXEh2hfEBfRpQMsXcUwJFbYchWkwiJv7Gb/xap0TjS57FbuXgTuK9dsuH6s6R
kGtRpbKrmlFsILjWo/IRv6DtL95y3cKc83FNTiwfTRB59UNSYSctNcbKMCBqL42UV2DB6qNujqPF
qpPidQ2DVHQP3EnTezTASp+/7X63jmoXQCtWjfqCvIdF+5h3H3VN3jxDEfjW8otbv/N0PUCASp2c
mYlCwQIDA
-----END PUBLIC KEY-----`

const priKey = `-----BEGIN PUBLIC KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRvAZmnTpapwILzqw3yM9CCfw2
piPtOmop3eXdLGTIef/77KjkOy7h9wF71S2POwhfo7vJIckGV/9WIsh3oRgIYN3pHapRoC6GoYT2
iOscmi5btVpy8t2LsE3n1pNcSHaF8QF9GlAyxdxTAkVthyFaTCIm/sZv/FqnRONLnsVu5eBO4r12
y4fqzpGQa1GlsquaUWwguNaj8hG/oO0v3nLdwpzzcU1OLB9NEHn1Q1JhJy01xsowIGovjZRXYMHq
o26Oo8Wqk+J1DYNUdA/cSdN7NMBKn7/tfreOahdAK1aN+oK8h0X7mHcfdU3ePEMR+Nbyi1u/83Q9
QIBKnZyZiULBAgMBAAECggEAQ6UXA4Jvl6x1kq132tzm9yxTWbp8apz2skBBdgwpK7UVUQZkzqt5
84EHu0cUQquQE3SYsZ9xA/TMnFrA2mZ4FUuBNbeDWygS8IMAiL69AyW95uui9EAu/av0PWyoMemg
ukNIAZ25JBgbUJx5RYG3xYYZRCh2S3zDR2j+aBdmZTayANFpdR3/nvoYtXca4sQSZGTDEU2ai4mj
SQQ8cbjiNTaqTtagHmqw0l870OTX4lq9duvaU0AUN9h/WKDBrnj1orUGpFKnvNN2Dcndj2lto/Xs
Rnpn9KkVvnIKooLtg8MUbF8McGvQ8/NG5TIa1sJ1PEK/J0+9+87vLtsOV+WZUQKBgQDZITjzoPXf
16hrd//xikdcq5C38SnjAhPoWbscHx6QwESGM+V2t1sdGQaktQ2LYktb2vYlqqOl3ZAhAGllHfsZ
3e7YmYW/zbjynpz2hKyDWXH/Ms50uul3xKIES3QsaXwYZ0m0t0NNcQDKEul4gkY0HLWZfEVmYSY4
XsBgSEfGnwKBgQCr0tkQgRycJnTjE/GmgyynSqhFDMejz1f+n/gD+sprii4UAkpOlermsULFU9z4
YnFQAthOn5bCKqIQmXKuTUIQhwK9yzINYjH4WGUf7eP1+SJi3ppncqq0kNxc+WGhDEkpERzojp9o
5pn9i8LRfQnA6AM9wM+jUrhVM+p0aD9anwKBgQDM5CfM5p/+SZAZUZSIxlbO4OrgWMeQ+r30bPA+
+jKqn3RKO6CV5TIqhBobxOnyFKBOHpJWOu7QLwK50ZyjGaaA40dmx4BJ3YRgFkLB8bKlA/upuLTP
vC1hooDMkrMe0a+Ti6wmxyTQaAk5ppz/5db/h/Pp0TXgBV6+pNLeSHbKuwKBgBRlE5TM7ntuaSNn
A6DzIwK8btq7WJsOCnDTxhma1BoNrch8ORu42cgGNFm9yZXGAZMws0Ip2Tg03UXBIQalbvkNPXsP
umIyTKIgw+gVUaCpsLYxm/w5dR+3riBvDXKTRb/VIyxLeYp3DMI2q6o4AEdggrn6v+qv7+dVITgu
A48bAoGAeL/ryh+MBe6i0Fny4DkUY9Ar1UhLHNK5ZGsO4QAk8Fj+vWQkYzccY61EKafZQPYMZjqI
3Ks5P07bw3J3Ceg/WCISQOcHAs/PUPaooZaPwFRt2JRrxg42lKSGqBKet2sj8ay1wyd0Pxoa/bUD
8dTfR0bBtwZyChvkbD+6XOr/QUU=
-----END PUBLIC KEY-----
`



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
        for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


request.interceptors.request.use((url, options) => {
/*
    const t = new Date().getTime()
    console.log("Time:",t)
    console.log(crypto)

    const t2 = crypto.publicEncrypt(pubKey, Buffer.from(t.toString()))
    console.log("EncryptTime:",t2)
    console.log("DecryptTime:", crypto.privateDecrypt(priKey, t2))
*/
    //console.log(url)
    const params = GetRequest();
    console.log(params)
    let ticket = params.ticket // "ST-41-0NuSQsXWOZg1OTopyI9F-isc.sgcc.com.cn"; //

/*
    // 垃圾测试代码，等敖工回来
    if (url.search("/api/confirm/listAssetIdentifier")>=0 && ticket){
      history.push(`/isc?ticket=${ticket}`)
    }
*/

    const currentUserStr = localStorage.getItem('tdsp');
    let currentUser : API.CurrentUser = JSON.parse(currentUserStr);
    let token = currentUser? currentUser.token : null
    console.log(currentUser)
    alert(`请求拦截器ticket & token：${ticket} / ${token}`)
    if (ticket && !token){
      console.log("ticket exists:",ticket)
      const headers = {
        Authorization: `${token}`, //`F774CA755A4EB4B14BD3DE087286C5B269FF411B9989BFDBE8A7049CE46016FB`,//
        Timestamp: new Date().getTime().toString()
      };
      return ({
        url: `/api/user/isc-login?ticket=${ticket}`,
        options: { ...options, headers},
      });
    }
    else{
      console.log("ticket missing or token exists:",ticket)
      const headers = {
        Authorization: token, //`F774CA755A4EB4B14BD3DE087286C5B269FF411B9989BFDBE8A7049CE46016FB`,//
        Timestamp: new Date().getTime().toString()
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
    if (data.redirect){
      //history.push(data.redirect);
      localStorage.removeItem('tdsp')
      window.location.href = data.redirect
      throw message.error("状态异常，请重新登录");
      //GAVIN TODO 清理缓存
    }
    else{
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
