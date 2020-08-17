import request from 'umi-request';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  }).then(resp => {
    const tableListDataSource: TableListItem[] = [];
    tableListDataSource.push({
      dataHash: '0x5dcccccdaa9237504',
      assetName: 'TJ_OBJ_ONE',
      usages: '报表生成、数据集成、业务数据',
      dataTypes: '测序数据',
      expireAt: '2020-08-18 00:00:01',
      status: (Math.floor(Math.random() * 10) % 3),
    });
    return { 'data': tableListDataSource }
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
