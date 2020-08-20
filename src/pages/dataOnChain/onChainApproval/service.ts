import request from 'umi-request';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api', {
    params,
  }).then(resp => {
    const tableListDataSource: TableListItem[] = [];
    tableListDataSource.push({
	  requestId: 'reqId1',
      dataHash: '0x5dcccccdaa9237504',
      user: '章明',
      department: "业务部",
      assetName: 'TJ_OBJ_ONE',
      usages: '报表生成、数据集成、业务数据',
      dataTypes: '测序数据',
      expireAt: '2020-08-18 00:00:01',
    });
    return { 'data': tableListDataSource }
  });
}

export async function listWaitingRequests(token: string) {
  return request('/api/onchain/listAllRequests', {
    method: 'GET',
	headers: {
		'Authorization': token,
	}
  }).then((resp) => {
	  console.log('listWaitingRequests:', resp);
	  if(resp.status === 200) {
		  return resp;
	  }
	  return "";
  });
}

export async function updateOnChainRequest(token: string, reqId: string, status: number) {
	return request('/api/onchain/update', {
		method: 'POST',
		headers: {
			'Authorization': token,
		},
		data: {
			'requestId': reqId,
			'status': status,
		}
	}).then(resp => {
		console.log(resp);
		return resp.status === 200;
	});
}
