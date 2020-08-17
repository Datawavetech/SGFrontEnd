import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import { getBlockHeightData } from './service';
import { VisitDataType } from './data'
import moment from 'moment';

const beginDay = new Date().getTime();
const fakeY = [2, 5, 14, 15, 17, 23, 25, 26, 35, 39, 46, 53, 61, 65, 73, 76, 85];
const visitData: VisitDataType[] = [];
const visitData2: VisitDataType[] = [];
const visitData3: VisitDataType[] = [];
const visitData4: VisitDataType[] = [];

for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const fakeY2 = [1, 7, 11, 19, 22, 29, 31];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const fakeY3 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY3.length; i += 1) {
  visitData3.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY3[i],
  });
}

const fakeY4 = [84, 84, 84, 84, 84, 85, 85, 85, 85, 85]
for (let i = 0; i < fakeY4.length; i += 1) {
  visitData4.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY4[i],
  });
}
const TableList: React.FC<{}> = () => {
  const [blockHeightData, setBlockHeightData] = useState({});
  const [txAmount, setTxAmount] = useState({});
  const [realTimeTX, setRealTimeTX] = useState({});
  const [latestBlock, setLatestBlock] = useState({});
  useEffect(()=>{
    setBlockHeightData(visitData)
    setTxAmount(visitData2)
    setRealTimeTX(visitData3)
    setLatestBlock(visitData4)
    console.log(blockHeightData)
  })

  return (
    <PageHeaderWrapper>
      
      <IntroduceRow visitData={blockHeightData} visitData2={txAmount} visitData3={realTimeTX} visitData4={latestBlock}/>
     
    </PageHeaderWrapper>
  );
};

export default TableList;
