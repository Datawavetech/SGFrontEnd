import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listTokenInfo(params?: TableListParams) {
  return request(`/api/comment/token?${stringify(params)}`);
}
