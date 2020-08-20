import request from 'umi-request';
import { OnChainRequest } from './data.d';


export async function listUserRequests(token: string) {
	return request('/api/onchain/listUserRequests', {
		method: 'GET',
		headers: {
			"Authorization": token,
		}
	}).then((resp) => {
		console.log('resp;', resp)
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
		console.log('listUsages: ', resp);
		if (resp.status === 200) {
			return resp;
		}
		return "";
	})
}

export async function createOnChainRequest(token: string, params?: OnChainRequest) {
	const formData = new FormData();
	//const fr = new FileReader();
	//fr.readAsDataURL(params.file.fileList[0]);
	formData.append('usages', JSON.stringify(params.usages));
	formData.append('dataTypes', JSON.stringify(params.dataTypes));
	formData.append('expireAt', params.expireAt);
	formData.append('file', params.file.fileList[0]);
	return request('/api/onchain/upload', {
		method: 'POST',
		headers: {
			'Authorization': token,
		},
		data: formData,
	}).then((resp) => {
		console.log(resp);
		return resp;
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
		return resp;
	});
}

// TODO params?: TableListParams
export async function createAssetIdentifier() {
	return request('/api/confirm/assetIdentifier', {
		method: 'POST',
		// params,
	});
}

// TODO params: { dataHashs: string[] }
export async function deleteAssetIdentifier() {
	return request('/api/rule', {
		method: 'POST',
		data: {
			// ...params,
			method: 'delete',
		},
	});
}

// params: TableListParams
export async function addRule() {
	return request('/api/rule', {
		method: 'POST',
		data: {
			// ...params,
			method: 'post',
		},
	});
}

//  TODO params: TableListParams
export async function updateRule() {
	return request('/api/rule', {
		method: 'POST',
		data: {
			// ...params,
			method: 'update',
		},
	});
}
