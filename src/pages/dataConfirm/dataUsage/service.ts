import request from 'umi-request';
import { TableListParams } from './data.d';

export async function listDataUsage() {
  return request('/api/confirm/dataUsage', {
    method: 'GET',
    // eslint-disable-next-line consistent-return
  }).then((resp) => {
    if (resp.status === 200) {
      return resp;
    }
  });
}

export async function removeRule(params: { key: string[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

//  params: TableListParams
export async function addRule() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
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
