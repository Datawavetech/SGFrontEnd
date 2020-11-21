import request from '@/utils/request';
import { stringify } from 'qs';

export async function updateTokenStatus() {
  return request(`/api/confirm/listAssetIdentifier`);
}


