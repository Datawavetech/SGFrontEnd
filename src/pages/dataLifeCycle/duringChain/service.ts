import request from '@/utils/request';
import { TableListParams } from './data.d';
import { stringify } from 'qs';

export async function listDcmcDataRouter(params: TableListParams) {
  return request(`/api/life/dcmcRouter?${stringify(params)}`);
}
