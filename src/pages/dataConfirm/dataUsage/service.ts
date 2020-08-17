import request from 'umi-request';
import { TableListParams } from './data.d';
import { Server_Url as url } from '../../../utils/const'

const dataUsageApi = url + '/api/confirm/dataUsage'

export async function listDataUsage(params?: TableListParams) {
  return request(dataUsageApi, {
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

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
