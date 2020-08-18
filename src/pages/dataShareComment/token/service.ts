import request from 'umi-request';
import { TableListParams, TokenInfo } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  }).then(resp => {
    const tokenInfos: TokenInfo[] = []
    tokenInfos.push({
      userId: '245666-dbcsaer',
      username: '章明',
      userType: 1,
      token: 50,
      tokenComment: '贡献卓越',
      updateAt: '2020-08-08 18:08:08',
    })
    return { 'data': tokenInfos }
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
