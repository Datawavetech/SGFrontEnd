import request from '@/utils/request';
import { TableListParams } from './data';
import { stringify } from 'qs';

export async function listTraceability(params: TableListParams) {
  return request(`/api/life/traceability?${stringify(params)}`);
}
