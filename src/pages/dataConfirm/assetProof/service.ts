import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listAssetProof(params?: TableListParams) {
  return request(`/api/confirm/listAssetProof?${stringify(params)}`);
}