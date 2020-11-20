import { errorLogColoumn, TableListParam } from './data'
import request from '@/utils/request';
import { stringify } from 'qs';

export async function listAuditLog(params: TableListParam) {
  return request(`/api/audit/listErrorLog?${stringify(params)}`);
}

