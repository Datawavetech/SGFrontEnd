import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  }).then(resp => {
    const list: TableListItem[] = []
    list.push({
      dataIdentifier: '2caaabbbb244365',
      levelOneSysName: '政治保电系统',
      levelOneSysDataHash: 'cccaaabbb',
      levelOneSysCreateAt: '2020-08-08 01:02:03',
      levelTwoSysName: '数据中台',
      levelTwoSysDataHash: 'cccaaabbb',
      levelTwoSysCreateAt: '2020-08-09 01:02:03',
      levelThreeSysName: '冬奥指挥平台',
      levelThreeSysDataHash: 'cccaaabbb',
      levelThreeSysCreateAt: '2020-08-10 01:02:03',
    })
    return {'data':list}
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
