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

export async function createDataUsage(params: TableListParams) {
  return request('/api/confirm/dataUsage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDataUsage(params: TableListParams) {
  return request('/api/confirm/dataUsage', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}


export async function deleteDataUsage(params: { usageIds: string[] }) {
  return request('/api/confirm/dataUsage', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
