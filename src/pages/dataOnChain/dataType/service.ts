import request from '@/utils/request';
import { TableListParams } from './data';
import { stringify } from 'qs';

export async function listDataType(params: TableListParams) {
  return request(`/api/onchain/dataType?${stringify(params)}`);
}

export async function createDataType(params: TableListParams) {
  return request('/api/onchain/dataType', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDataType(params: TableListParams) {
  return request('/api/onchain/dataType', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}


export async function deleteDataType(params: { typeIds: string[] }) {
  return request('/api/onchain/dataType', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
