import request from '@/utils/request';
import { TableListParams } from './data.d';
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
  return request(`/api/comment/listModel?${stringify(params)}`);
}

export async function createTokenModel(params: TableListParams) {
  return request('/api/comment/addModel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateTokenModel(params: TableListParams) {
  return request('/api/comment/updateModel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deleteTokenModel(params: { modelIds: string[] }) {
  return request('/api/comment/deleteModel', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

