import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function getBlockHeightData() {
  return request('/api/chainMng/BlockHeight');
}
