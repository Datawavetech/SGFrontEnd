import request from '@/utils/interceptors';
import { TableListParams } from './data.d';
import { stringify } from 'qs';
import { SuperResult } from '@/services/SuperResult'
import { message } from 'antd';

export async function listAssetIdentifier(token: string, params: TableListParams) {
  return request(`/api/confirm/assetIdentifier?${stringify(params)}`, {
    headers: {
      'Authorization': token
    },
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
  }).then((resp: SuperResult) => {
    if (resp.status !== 200) {
      throw message.error(resp.data);
    }
    return resp;
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
