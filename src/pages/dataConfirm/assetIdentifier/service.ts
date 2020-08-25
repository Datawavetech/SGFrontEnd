import request from 'umi-request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listAssetIdentifier(params: TableListParams) {
  return request(`/api/confirm/assetIdentifier?${stringify(params)}`).then((resp) => {
    if (resp.status === 200) {
      return resp;
    }
    return '';
  });
}

export async function createAssetIdentifier(token: string, params: TableListParams) {
  return request('/api/confirm/assetIdentifier', {
    method: 'POST',
    headers: {
      'Authorization': token
    },
    data: {
      ...params
    },
  });
}

export async function updateAssetIdentifier(token: string, params: TableListParams) {
  return request('/api/confirm/assetIdentifier', {
    method: 'PUT',
    headers: {
      'Authorization': token
    },
    data: {
      ...params
    },
  });
}


export async function deleteAssetIdentifier(token: string, params: { deleteDataHashs: string[] }) {
  console.log('params:', params)
  return request('/api/confirm/assetIdentifier', {
    method: 'DELETE',
    headers: {
      'Authorization': token
    },
    data: {
      ...params,
    },
  });
}
