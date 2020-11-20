import request from '@/utils/request';
import { stringify } from 'qs';
import {logStatus} from "./data"

export async function changeLogSwitch(param: logStatus) {
  return request(`/api/audit/updateLogSwitch`,{
    method: "POST",
    data: { ...param }
  })
}

export async function getLogSwitchStatus(){
  return request(`/api/audit/listLogSwitch`)
}
