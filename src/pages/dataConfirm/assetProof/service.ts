import request from 'umi-request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listAssetProof(params?: TableListParams) {
  return request(`/api/confirm/assetProof?${stringify(params)}`).then((resp) => {
    if (resp.status === 200) return resp;
    return 0;
  });
}