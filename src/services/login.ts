import { message } from 'antd';
import { request, history } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export async function login(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/sysManagement/login', {
    method: 'POST',
    data: { ...params },
  });
}

export async function logout() {
  const currentUserStr = localStorage.getItem('tdsp');
  if (!currentUserStr) {
    history.push('/user/login');
    throw message.error('登录异常请重新登录！');
  }
  let currentUser: API.CurrentUser = JSON.parse(currentUserStr);
  let token = currentUser ? currentUser.token : null
  return request('/api/sysManagement/logout', {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    }
  }).then(resp => {
    if (resp && resp.status === 200) {
      localStorage.removeItem('tdsp');
      history.push('/user/login');
    }
    return { 'success': true, 'data': {} }
  });
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}


export async function loadPermission() {
  return request("/api/user/isc-permission")
}

export async function loginISC(ticket: any) {
  return request(`/api/user/isc-login?ticket=${ticket}`)
}


export async function logoutISC() {
  return request('/api/user/isc-logout').then(resp => {
    localStorage.removeItem('tdsp')
    history.push("/isc")
    return { 'success': true, 'data': {} }
  });
}


