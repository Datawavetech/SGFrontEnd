import { runningLogColoumn, TableListParam } from './data'
import request from '@/utils/request';
import { stringify } from 'qs';

export async function listAuditLog(params: TableListParam) {
  console.log(params)
  return request(`/api/audit/listBusLog?${stringify(params)}`);
}
