import request from 'umi-request';
// import { TableListParams } from './data.d';
import { Server_Url as url } from '../../../utils/const'

const assetProofApi = url + '/api/confirm/assetProof'

// TODO params?: TableListParams
export async function listAssetProof() {
  return request(assetProofApi, {
    method: 'GET',
  }).then(resp => {
    if (resp.status === 200) {
      return resp
    }
  });
}

export async function removeRule(params: { key: string[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}


//params: TableListParams
export async function addRule() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'post',
    },
  });
}

// TODO params: TableListParam
export async function updateRule(s) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'update',
    },
  });
}
