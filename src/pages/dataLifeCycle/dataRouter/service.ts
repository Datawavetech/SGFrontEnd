import { request } from 'umi';
import { TableListParams, DataRouter } from './data';
import { stringify } from 'qs';

export async function listDataRouter(params?: TableListParams) {
  //console.log('params:', params)
  return request(`/api/life/router?${stringify(params)}`).then(resp => {
    const list: DataRouter[] = []
    if (resp.data !== null) {
      const data = resp.data
      for (var i = 0; i < data.length; i++) {
        const levelOne = data[i].levelOneSys
        const levelTwo = data[i].levelTwoSys
        const levelThree = data[i].levelThreeSys
        var levelOneSysName, levelOneSysDataHash, levelOneSysCreateAt
        var levelTwoSysName, levelTwoSysDataHash, levelTwoSysCreateAt
        var levelThreeSysName, levelThreeSysDataHash, levelThreeSysCreateAt
        if (levelOne !== null) {
          levelOneSysName = levelOne.sysName
          levelOneSysDataHash = levelOne.dataHash
          levelOneSysCreateAt = levelOne.createAt
        }
        if (levelTwo !== null) {
          levelTwoSysName = levelTwo.sysName
          levelTwoSysDataHash = levelTwo.dataHash
          levelTwoSysCreateAt = levelTwo.createAt
        }
        if (levelThree !== null) {
          levelThreeSysName = levelThree.sysName
          levelThreeSysDataHash = levelThree.dataHash
          levelThreeSysCreateAt = levelThree.createAt
        }
        list.push({
          dataIdentifier: data[i].dataIdentifier,
          levelOneSysName: levelOneSysName,
          levelOneSysDataHash: levelOneSysDataHash,
          levelOneSysCreateAt: levelOneSysCreateAt,
          levelTwoSysName: levelTwoSysName,
          levelTwoSysDataHash: levelTwoSysDataHash,
          levelTwoSysCreateAt: levelTwoSysCreateAt,
          levelThreeSysName: levelThreeSysName,
          levelThreeSysDataHash: levelThreeSysDataHash,
          levelThreeSysCreateAt: levelThreeSysCreateAt,
        })
      }
    }

    return { 'data': list }
  });
}
