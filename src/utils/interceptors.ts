import { SuperResult } from '@/services/SuperResult';
import { message } from 'antd';
import { history } from 'umi';
import request from 'umi-request';

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
            url: url,
            options: { ...options, headers: headers },
        });
    } else {
        history.push('/user/login');
        return ({});
    }

})

// 对于请求返回的统一处理
request.interceptors.response.use(async response => {
    const data: SuperResult = await response.clone().json();
    console.log('状态:', data);
    // 未登录或登录超时，统一跳转到登录页面
    if (data.status === 401) {
        history.push('/user/login');
        throw message.error("登录超时，请重新登录");
    } else if (data.status === 402) {
        throw message.error("用户权限不足");
    } else if (data.status === 500) {
        if (data.data !== undefined && data.data !== null) {
            throw message.error(data.data);
        }
        return response;
    }
    return response;
});

export default request;