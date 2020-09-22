import request from '@/utils/request';
import { OnChainRequestForm, TableListParams } from './data.d';
import { stringify } from 'qs';


export async function listUserRequests(token: string, params: TableListParams) {
	return request(`/api/onchain/listUserRequests?${stringify(params)}`);
}

export async function listDataTypes() {
	return request('/api/onchain/dataType');
}

export async function listUsages() {
	return request('/api/confirm/dataUsage');
}

export async function createOnChainRequest(token: string, params: OnChainRequestForm) {
  const formData = new FormData();
  const {usages, dataTypes, expireAt, file} = params
  console.log(params)
	formData.append('usages', JSON.stringify(usages));
	formData.append('dataTypes', JSON.stringify(dataTypes));
	formData.append('expireAt', expireAt);
	formData.append('file', file.file.originFileObj);
	return request('/api/onchain/upload', {
		method: 'POST',
		headers: {
			'Authorization': token,
		},
		data: formData,
	}).then((resp) => {
		return resp.status === 200;
	});
}

export async function updateOnChainRequest(token: string, reqId: string, status: number) {
	return request('/api/onchain/update', {
		method: 'POST',
		data: {
			'requestId': reqId,
			'status': status,
		}
	}).then(resp => {
		console.log(resp);
		return resp.status === 200;
	});
}
