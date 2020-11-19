import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listAssetIdentifier(params: TableListParams) {
  return request(`/api/confirm/listAssetIdentifier?${stringify(params)}`);
}

export async function createAssetIdentifier(params: TableListParams) {
  return request('/api/confirm/addAssetIdentifier', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateAssetIdentifier(params: TableListParams) {
  return request('/api/confirm/updateAssetIdentifier', {
    method: 'POST',
    data: {
      ...params
    },
  });
}


export async function deleteAssetIdentifier(params: { deleteDataHashs: string[] }) {
  return request('/api/confirm/deleteAssetIdentifier', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
