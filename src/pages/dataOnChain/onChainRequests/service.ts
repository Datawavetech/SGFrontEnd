import request from 'umi-request';
//  import { TableListParams } from './data.d';
//  TODO params?: TableListParams
export async function listOnChainRequest() {
  return request('/api/confirm/assetIdentifier', {
    method: 'GET',
  }).then((resp) => {
    if (resp.status === 200) {
      return resp;
    }
    return '';
  });
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

//  TODO params: TableListParams
export async function updateRule() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'update',
    },
  });
}
