import request from 'umi-request';
import { TableListParams } from './data.d';

export async function listAssetIdentifier() {
  return request('/api/confirm/assetIdentifier', {
    method: 'GET',
  }).then((resp) => {
    if (resp.status === 200) {
      return resp;
    }
    return '';
  });
}

export async function createAssetIdentifier(params: TableListParams) {
  return request('/api/confirm/assetIdentifier', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateAssetIdentifier(params: TableListParams) {
  return request('/api/confirm/assetIdentifier', {
    method: 'PUT',
    data: {
      ...params
    },
  });
}


export async function deleteAssetIdentifier(params: { deleteDataHashs: string[] }) {
  console.log('params:', params)
  return request('/api/confirm/assetIdentifier', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}
