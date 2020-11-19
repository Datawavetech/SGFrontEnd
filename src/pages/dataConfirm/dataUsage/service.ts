import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listDataUsage(params: TableListParams) {
  return request(`/api/confirm/listDataUsage?${stringify(params)}`);
}

export async function createDataUsage(params: TableListParams) {
  return request('/api/confirm/addDataUsage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDataUsage(params: TableListParams) {
  return request('/api/confirm/updateDataUsage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function deleteDataUsage(params: { usageIds: string[] }) {
  return request('/api/confirm/deleteDataUsage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
