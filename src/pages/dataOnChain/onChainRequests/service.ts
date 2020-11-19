import request from '@/utils/request';
import { DownloadFileParams, OnChainRequestForm, TableListParams } from './data.d';
import { stringify } from 'qs';
import { message } from 'antd';


export async function listUserRequests(params: TableListParams) {
	return request(`/api/onchain/listUserRequests?${stringify(params)}`);
}

export async function listDataTypes() {
	return request('/api/onchain/listDataType');
}

export async function listUsages() {
	return request('/api/confirm/listDataUsage');
}

export async function createOnChainRequest(params: OnChainRequestForm) {
	const formData = new FormData();
	const { usages, dataTypes, expireAt, file } = params
	if (!usages || !dataTypes || !expireAt || !file) {
		message.error('创建上链请求参数异常');
		return;
	}
	formData.append('usages', usages);
	formData.append('dataTypes', dataTypes);
	formData.append('expireAt', expireAt.valueOf());
	formData.append('file', file.file.originFileObj);
	return request('/api/onchain/upload', {
		method: 'POST',
		data: formData,
	});
}

export async function downloadFile(params: DownloadFileParams) {
	return request(`/api/onchain/download?${stringify(params)}`);
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
