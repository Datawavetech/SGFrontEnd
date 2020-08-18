import request from 'umi-request';
import { OnChainRequest } from './data.d';
//  TODO params?: TableListParams
export async function listOnChainRequest() {
  return request('/api/onchain/list', {
    method: 'GET',
  }).then((resp) => {
	  if(resp.status === 200) {
		  return resp;
	  }
	  return "";
  });
}

export async function createOnChainRequest(token: string, params?: OnChainRequest) {
	return request('/api/onchain/upload', {
		method: 'POST',
		headers: {
			'Authorization': token,
		},
		data: {
			...params,
		}
	}).then((resp) => {
		console.log(resp);
		return resp;
	});
}

export async function updateOnChainRequest(token: string, reqId: string, status: int) {
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
