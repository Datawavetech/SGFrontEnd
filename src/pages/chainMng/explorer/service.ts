import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function getBlockHeightData() {
  return request('/api/chainMng/BlockHeight');
}

export async function getBlockInfo() {
  await request('/api/chain/info');

}

/*
图-1: /api/chain/lastBlockTimeList 
图-2: /api/chain/lastTxTimeList  
图-3: /api/chain/lastTxTimeListSevenHour  
图-4: /api/chain/lastBlockTimeListSevenHour
*/