import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import { getChainInfo, getBlockTimeList, getRealTimeBlockTimeList, getTxTimeList, getRealTimeTxTimeList } from './service';
import { VisitDataType } from './data'
import moment from 'moment';

const beginDay = new Date().getTime();
const fakeY = [2, 5, 14, 15, 17, 23, 25, 26, 35, 39, 46, 53, 61, 65, 73, 76, 85];
const fd1: VisitDataType[] = [];
const fd2: VisitDataType[] = [];
const fd3: VisitDataType[] = [];
const fd4: VisitDataType[] = [];

for (let i = 0; i < fakeY.length; i += 1) {
  fd1.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const fakeY2 = [1, 7, 11, 19, 22, 29, 31];
for (let i = 0; i < fakeY2.length; i += 1) {
  fd2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const fakeY3 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY3.length; i += 1) {
  fd3.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY3[i],
  });
}

const fakeY4 = [84, 84, 84, 84, 84, 85, 85, 85, 85, 85]
for (let i = 0; i < fakeY4.length; i += 1) {
  fd4.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY4[i],
  });
}
const TableList: React.FC<{}> = () => {
  const [blockHeight, setBlockHeight] = useState(fd1);
  const [txAmount, setTxAmount] = useState(fd2);
  const [realTimeTxAmount, setRealTimeTxAmount] = useState(fd3);
  const [realTimeBlockHeight, setRealTimeBlockHeight] = useState(fd4);
  useEffect(() => {
    (async () => {
      // const blockHeightT = await getBlockTimeList()
      // const realTimeBlockHeightT = await getRealTimeBlockTimeList()
      // const txAmountT = await getTxTimeList()
      // const realTimeTxAmountT = await getRealTimeTxTimeList()
      const { blockHeightT, realTimeBlockHeightT, txAmountT, realTimeTxAmountT } = await getChainInfo();
      setBlockHeight(blockHeightT);
      setTxAmount(txAmountT);
      setRealTimeTxAmount(realTimeBlockHeightT);
      setRealTimeBlockHeight(realTimeTxAmountT);
      //console.log(blockHeightT,realTimeBlockHeightT,txAmountT,realTimeTxAmountT)
    })();

    //console.log(blockHeight)
  }, [])

  return (
    <PageHeaderWrapper>

      <IntroduceRow blockHeightData={blockHeight} txAmountData={txAmount} realTimeTxAmountData={realTimeTxAmount} realTimeBlockHeightData={realTimeBlockHeight} />

    </PageHeaderWrapper>
  );
};

export default TableList;
