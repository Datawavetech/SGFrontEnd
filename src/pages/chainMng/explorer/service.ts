import request from 'umi-request';
import moment from 'moment';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function getBlockHeightData() {
  return request('/api/chainMng/BlockHeight');
}

export async function getBlockInfo() {
  await request('/api/chain/info');
}

export async function getBlockTimeList(){
  const BlockTimeData = await request('/api/chain/lastBlockTimeList');
  const BlockTimeList = []
  if (BlockTimeData.status === 200){
      for (let i = BlockTimeData.data.length-1; i >= 0; i-=1){
        // eslint-disable-next-line radix
        const timeInInt = parseInt(BlockTimeData.data[i].timestamp)/1000000
        const timeInDate = moment(new Date(timeInInt)).format('YYYY-MM-DD')
        BlockTimeList.push({
          x : timeInDate,
          y : BlockTimeData.data[i].count
        })
      }
  }
  //console.log(BlockTimeList)
  return BlockTimeList
}

export async function getRealTimeBlockTimeList(){
  const realTimeBlockTimeData =  await request('/api/chain/lastBlockTimeListSevenHour');
  const realTimeBlockTimeList = []
  if (realTimeBlockTimeData.status === 200){
    for (let i = realTimeBlockTimeData.data.length-1; i >= 0; i-=1){
      // eslint-disable-next-line radix
      const timeInInt = parseInt(realTimeBlockTimeData.data[i].timestamp)/1000000
      const timeInDate = moment(new Date(timeInInt)).format('YYYY-MM-DD HH:mm:ss')
      realTimeBlockTimeList.push({
        x : timeInDate,
        y : realTimeBlockTimeData.data[i].count
      })
    }
  }
  //console.log(realTimeBlockTimeList)
  return realTimeBlockTimeList
}

export async function getTxTimeList(){
  const TxTimeData =  await request('/api/chain/lastTxTimeList');
  const TxTimeList = []
  if (TxTimeData.status === 200){
    for (let i = TxTimeData.data.length-1; i >= 0; i-=1){
      // eslint-disable-next-line radix
      const timeInInt = parseInt(TxTimeData.data[i].timestamp)/1000000
      const timeInDate = moment(new Date(timeInInt)).format('YYYY-MM-DD')
      TxTimeList.push({
        x : timeInDate,
        y : TxTimeData.data[i].count
      })
    }
  }
  //console.log(TxTimeList)
  return TxTimeList
}

export async function getRealTimeTxTimeList(){
  const realTimeTxTimeData =  await request('/api/chain/lastTxTimeListSevenHour');
  const realTimeTxTimeList = []
  if (realTimeTxTimeData.status === 200){
    for (let i = realTimeTxTimeData.data.length-1; i >= 0; i-=1){
      // eslint-disable-next-line radix
      const timeInInt = parseInt(realTimeTxTimeData.data[i].timestamp)/1000000
      const timeInDate = moment(new Date(timeInInt)).format('YYYY-MM-DD HH:mm:ss')
      realTimeTxTimeList.push({
        x : timeInDate,
        y : realTimeTxTimeData.data[i].count
      })
    }
  }
  //console.log(realTimeTxTimeList)
  return realTimeTxTimeList
}

/*
图-1: /api/chain/lastBlockTimeList 
图-2: /api/chain/lastTxTimeList  
图-3: /api/chain/lastTxTimeListSevenHour  
图-4: /api/chain/lastBlockTimeListSevenHour
*/