import request from 'umi-request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listDataUsage(params: TableListParams) {
  return request(`/api/confirm/dataUsage?${stringify(params)}`).then((resp) => {
    if (resp.status === 200) {
      return resp;
    }
  });
}

export async function createDataUsage(token: string, params: TableListParams) {
  return request('/api/confirm/dataUsage', {
    method: 'POST',
    headers: {
      'Authorization': token
    },
    data: {
      ...params,
    },
  });
}

export async function updateDataUsage(token: string, params: TableListParams) {
  return request('/api/confirm/dataUsage', {
    method: 'PUT',
    headers: {
      'Authorization': token
    },
    data: {
      ...params,
    },
  });
}


export async function deleteDataUsage(token: string, params: { usageIds: string[] }) {
  return request('/api/confirm/dataUsage', {
    method: 'DELETE',
    headers: {
      'Authorization': token
    },
    data: {
      ...params,
    },
  });
}
