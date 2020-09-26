import request from '@/utils/request';
import { TableListParams } from './data';
import { stringify } from 'qs';

export async function listDataRouter(params?: TableListParams) {
  return request(`/api/life/router?${stringify(params)}`);
}
