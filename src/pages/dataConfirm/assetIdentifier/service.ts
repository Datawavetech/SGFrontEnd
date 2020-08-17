import request from 'umi-request';
// import { TableListParams } from './data.d';
import { Server_Url as url } from '../../../utils/const'

// const assetIdentifierApi = url + '/api/confirm/assetIdentifier'

// TODO params?: TableListParams
export async function listAssetIdentifier() {
  return request(url + '/api/confirm/assetIdentifier', {
    method: 'GET',
  }).then(resp => {
    if (resp.status === 200) {
      return resp
    }
    return ""
  })
}

// TODO params?: TableListParams
export async function createAssetIdentifier() {
  return request('/api/confirm/assetIdentifier', {
    method: 'POST',
    // params,
  });
}

// TODO params: { dataHashs: string[] }
export async function deleteAssetIdentifier() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'delete',
    },
  });
}

// params: TableListParams
export async function addRule() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'post',
    },
  });
}

//TODO params: TableListParams
export async function updateRule() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'update',
    },
  });
}
