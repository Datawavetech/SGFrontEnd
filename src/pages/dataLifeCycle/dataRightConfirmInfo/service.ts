import request from '@/utils/request';
import { TableListParams } from './data';
import { stringify } from 'qs';

export async function listDataRightConfirmInfo(params: TableListParams) {
  return request(`/api/life/dataRightConfirmInfo?${stringify(params)}`);
}
