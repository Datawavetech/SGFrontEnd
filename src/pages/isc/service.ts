import request from '@/utils/request';
import { stringify } from 'qs';

export async function updateTokenStatus(role: String) {

  if (role && role === "chain_audit"){
      return request(`/api/audit/listBusLog`);
  }

  return request(`/api/confirm/listAssetIdentifier`);
}


