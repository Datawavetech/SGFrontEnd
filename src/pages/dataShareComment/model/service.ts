import request from 'umi-request';
import { TableListParams, TokenModel } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  }).then(resp => {
    const tokenModels: TokenModel[] = []
    tokenModels.push({
      modelId: '245666-dbcsaer',
      modelName: '标准模型',
      modelDesc: '通用标准模型',
      upCount: 1,
      createAt: '2020-08-08 18:08:08',
      isRunning: 1,
    })
    return { 'data': tokenModels }
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
