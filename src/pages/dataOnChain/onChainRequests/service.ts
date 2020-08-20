import request from 'umi-request';
import { OnChainRequest, TableListParams } from './data.d';
import { stringify } from 'qs';


export async function listUserRequests(token: string, params: TableListParams) {
	return request(`/api/onchain/listUserRequests?${stringify(params)}`, {
		method: 'GET',
		headers: {
			"Authorization": token,
		}
	}).then((resp) => {
		if (resp.status === 200) {
			return resp;
		}
		return "";
	});
}

export async function listDataTypes() {
	return request('/api/onchain/dataType', {
		method: 'GET',
	}).then(resp => {
		if (resp.status === 200) {
			return resp;
		}
		return "";
	})
}

export async function listUsages() {
	return request('/api/confirm/dataUsage', {
		method: 'GET',
	}).then(resp => {
		if (resp.status === 200) {
			return resp;
		}
		return "";
	})
}

export async function createOnChainRequest(token: string, params?: OnChainRequest) {
	const formData = new FormData();
	formData.append('usages', JSON.stringify(params.usages));
	formData.append('dataTypes', JSON.stringify(params.dataTypes));
	formData.append('expireAt', params.expireAt);
	formData.append('file', params.file.file.originFileObj);
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