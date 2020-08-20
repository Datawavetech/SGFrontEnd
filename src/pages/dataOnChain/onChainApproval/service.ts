import request from 'umi-request';
import { TableListParams, TableListItem } from './data.d';
import { stringify } from 'qs';

export async function listWaitingRequests(token: string, params: TableListParams) {
	return request(`/api/onchain/listAllRequests?${stringify(params)}`, {
		method: 'GET',
		headers: {
			'Authorization': token,
		}
	}).then((resp) => {
		if (resp.status === 200) {
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
