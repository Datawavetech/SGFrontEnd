import request from 'umi-request';
import { TableListParams, TokenInfo } from './data.d';
import { stringify } from 'qs';

export async function listTokenInfo(params?: TableListParams) {
  return request(`/api/comment/token?${stringify(params)}`);
}
