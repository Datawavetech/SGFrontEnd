import request from 'umi-request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listUserKeyInfo(token: string, params: TableListParams) {
  return request(`/api/user/listUserKeyInfo?${stringify(params)}`, {
    headers: {
      'Authorization': token,
    }
  });
}
