import request from 'umi-request';
// import { TableListParams } from './data.d';
<<<<<<< HEAD
=======

>>>>>>> acbd57bd6645e29793eeef15011039fb526b17cd
// TODO params?: TableListParams
export async function listAssetProof() {
  return request('/api/confirm/assetProof', {
    method: 'GET',
  }).then((resp) => {
    if (resp.status === 200) return resp;
    return 0;
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

//  params: TableListParams
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
export async function updateRule() {
  return request('/api/rule', {
    method: 'POST',
    data: {
      // ...params,
      method: 'update',
    },
  });
}
