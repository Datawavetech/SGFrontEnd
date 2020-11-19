import request from '@/utils/request';
import { stringify } from 'qs';


export async function changeLogSwitch(param: number) {
  return request(`/api/audit/updateLogSwitch`,{
    method: "POST",
    data: {status: param}
  })
}

export async function getLogSwitchStatus(){
  return request(`/api/audit/listLogSwitch`)
}
