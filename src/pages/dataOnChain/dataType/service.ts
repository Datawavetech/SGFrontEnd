import request from '@/utils/request';
import { TableListParams } from './data';
import { stringify } from 'qs';

export async function listDataType(params: TableListParams) {
  return request(`/api/onchain/listDataType?${stringify(params)}`);
}

export async function createDataType(params: TableListParams) {
  return request('/api/onchain/addDataType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDataType(params: TableListParams) {
  return request('/api/onchain/updateDataType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function deleteDataType(params: { typeIds: string[] }) {
  return request('/api/onchain/deleteDataType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
