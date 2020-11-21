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
  return request('/api/user/logout').then(resp => {
    localStorage.removeItem('tdsp')
    localStorage.removeItem('tdsp_token')
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


export async function loadPermission () {
  return request("/api/user/isc-permission")
}

export async function loginISC (ticket: any){
  return request(`/api/user/isc-login?ticket=${ticket}`)
}


export async function logoutISC() {
  return request('/api/user/isc-logout').then(resp => {
    localStorage.removeItem('tdsp')
    history.push("/isc")
    return { 'success': true, 'data': {} }
  });
}


