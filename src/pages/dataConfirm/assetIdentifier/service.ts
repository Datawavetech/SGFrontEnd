import request from 'umi-request';
<<<<<<< HEAD
//  import { TableListParams } from './data.d';

//  const assetIdentifierApi = url + '/api/confirm/assetIdentifier'
=======
// import { TableListParams } from './data.d';
import { serverUrl as url } from '../../../utils/const'

const assetIdentifierApi = url + '/api/confirm/assetIdentifier'
>>>>>>> 4991f96f68aacb775d2ae5a2b3a6a1d69ce4dc87

//  TODO params?: TableListParams
export async function listAssetIdentifier() {
<<<<<<< HEAD
  return request('/api/confirm/assetIdentifier', {
=======
  return request(assetIdentifierApi, {
>>>>>>> 4991f96f68aacb775d2ae5a2b3a6a1d69ce4dc87
    method: 'GET',
  }).then((resp) => {
    if (resp.status === 200) {
<<<<<<< HEAD
      return resp;
=======
      console.log(resp.data)
      return resp
>>>>>>> 4991f96f68aacb775d2ae5a2b3a6a1d69ce4dc87
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
