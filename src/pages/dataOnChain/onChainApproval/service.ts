import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listWaitingRequests(params: TableListParams) {
	return request(`/api/onchain/listAllRequests?${stringify(params)}`);
}

export async function updateOnChainRequest(reqId: number, status: number) {
	return request('/api/onchain/update', {
		method: 'POST',
		data: {
			'requestId': reqId,
			'status': status,
		}
	});
}
