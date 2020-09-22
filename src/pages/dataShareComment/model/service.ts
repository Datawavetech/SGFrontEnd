import request from '@/utils/request';
import { TableListParams, TokenModel } from './data.d';
import { stringify } from 'qs';

export async function chooseTokenModel(params: TableListParams) {
  return request('/api/comment/chooseModel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function listTokenModel(params?: TableListParams) {
  return request(`/api/comment/model?${stringify(params)}`);
}

export async function createTokenModel(params: TableListParams) {
  return request('/api/comment/model', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateTokenModel(params: TableListParams) {
  console.log('params:', params)
  return request('/api/comment/model', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function deleteTokenModel(params: { modelIds: string[] }) {
  return request('/api/comment/model', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

