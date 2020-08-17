import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
import { getBlockHeightData } from './service';
import { VisitDataType } from './data'
import moment from 'moment';

const beginDay = 0
const fakeY = [2, 5, 14, 15, 17, 23, 25, 26, 35, 39, 46, 53, 61, 65, 73, 76, 85];
const visitData: VisitDataType[] = [];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}
const TableList: React.FC<{}> = () => {
  const [blockHeightData, setBlockHeightData] = useState({});
  useEffect(()=>{
    
    setBlockHeightData(visitData)
    console.log(blockHeightData)
  })

  return (
    <PageHeaderWrapper>
      
      <IntroduceRow visitData={blockHeightData} />
      <div>
        abc
      </div>
     
    </PageHeaderWrapper>
  );
};

export default TableList;
