import request from '@/utils/request';
import { TableListParams } from './data';
import { stringify } from 'qs';

export async function listUserKeyInfo(params: TableListParams) {
  return request(`/api/user/listUserKeyInfo?${stringify(params)}`);
}
