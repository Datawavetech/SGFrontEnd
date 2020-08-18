import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function listUseRight() {
  return request('/api/life/traceability', {
	  method: 'GET',
  }).then(resp => {
	  if(resp.status === 200) {
		  return resp;
	  }
	  return "";
  });
}

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
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

export async function addRule(params: TableListItem) {
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
