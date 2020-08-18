import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';

import React, { Component, Suspense, useState} from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';


import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';


const TableList: React.FC<{}> = () => {

  

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
              //visitData2={visitData2}
              //searchData={searchData}
              //dropdownGroup={dropdownGroup}
            />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <ProportionSales
              //dropdownGroup={dropdownGroup}
              //salesType={salesType}
              //loading={loading}
              //salesPieData={salesPieData}
              //handleChangeSalesType={this.handleChangeSalesType}
            />
          </Suspense>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default TableList;
