import request from '@/utils/request';
// import { TableListParams } from './data.d';

export async function querySysData(){
  console.log("in")
  const res = await request('/api/life/dataAnalyse')
  console.log(res)
  if (res.status === 200){
    const {data} = res
    const sysDataAmount = []
    const sysDataToken = []
    for (let i = 0; i < data.sysTokenInfos.length; i += 1){
      sysDataAmount.push({
        x : data.sysTokenInfos[i].sysName,
        y : data.sysTokenInfos[i].proofCount
      })
      sysDataToken.push({
        x : data.sysTokenInfos[i].sysName,
        y : data.sysTokenInfos[i].token
      })
    }

    return {sysDataAmount, sysDataToken}
  }
  return 0
}

export async function queryUsrData(){
  const res = await request('/api/life/dataAnalyse')
  if (res.status === 200){
    const {data} = res
    const usrData = []
    let sum = 0
    for (let i = 0; i < data.userApplicationsAnalyse.length; i += 1){
      sum += data.userApplicationsAnalyse[i].count
      usrData.push({
        userId: data.userApplicationsAnalyse[i].userId,
        userName: data.userApplicationsAnalyse[i].username ,
        count: data.userApplicationsAnalyse[i].count
      })
    }
    return {usrData, analysisData:
                        {
                          total:sum, 
                          average: sum/data.userApplicationsAnalyse.length
                        }}
  }
  return 0
}

export async function queryUserData(){
  return request('/api/life/dataAnalyse')
}

export async function queryRule(params?: TableListParams) {
  return request('/api/rule', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'Delete',
    data: {
      ...params,
    },
  });
}
