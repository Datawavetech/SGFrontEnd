import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import React, { Component, Suspense, useState} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
import moment from 'moment';
import { RadioChangeEvent } from 'antd/es/radio';




const TableList: React.FC<{}> = () => {

  const [analysisType,setAnalysisType] = useState<string>("amount")

  const visitData2 = [];
  const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
  const beginDay = new Date().getTime();
  for (let i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY2[i],
    });
  }
  const analysisDataAmount = [
    {
      x: '系统a',
      y: 4544,
    },
    {
      x: '系统b',
      y: 3321,
    },
    {
      x: '系统c',
      y: 3113,
    },
    {
      x: '系统d',
      y: 2341,
    },
    {
      x: '系统e',
      y: 1231,
    },
    {
      x: '系统f',
      y: 1026,
    },
    {
      x: '系统g',
      y: 826,
    }
  ];

  const analysisDataToken = [
    {
      x: '系统a',
      y: 50,
    },
    {
      x: '系统b',
      y: 45,
    },
    {
      x: '系统c',
      y: 35,
    },
    {
      x: '系统d',
      y: 30,
    },
    {
      x: '系统e',
      y: 25,
    },
    {
      x: '系统f',
      y: 20,
    },
    {
      x: '系统g',
      y: 10,
    }
  ];
 
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    userData.push({
      userId: `${i}`,
      userName: `用户${i}`,
      applyCount: Math.floor(Math.random() * 1000),
    });
  }
  
  const handleChangeAnalysisType = (e: RadioChangeEvent) => {
    console.log("debug:",e)
    setAnalysisType(e.target.value)
    console.log(analysisType)
  };

  return (
    <PageHeaderWrapper>
      <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <TopSearch
              //loading={loading}
              visitData2={visitData2}
              tableData={userData}
              //dropdownGroup={dropdownGroup}
            />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ProportionSales
              pieType={analysisType}
              pieData={analysisType==="amount"?analysisDataAmount:analysisDataToken}
              handleChangeAnalysisType={handleChangeAnalysisType}
            />
          </Suspense>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default TableList;
