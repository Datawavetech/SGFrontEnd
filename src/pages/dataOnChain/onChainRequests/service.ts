import request from 'umi-request';
import { OnChainRequest } from './data.d';
//  TODO params?: TableListParams
export async function listOnChainRequest() {
  return request('/api', {
    method: 'GET',
  }).then((resp) => {
    const requests: OnChainRequest[] = []
    requests.push({
      requestId: '0x1',
      userId: '0x2',
      dataHash: '0x333333333',
      dataPath: '/usr/local',
      dataName: 'TJ_ONE_TWO',
      usages: '报表生成、业务集成',
      dataTypes: '测绘数据',
      expireAt: '2020-09-01 00:00:00',
      status: 1,
    })
    return { 'data': requests }
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
