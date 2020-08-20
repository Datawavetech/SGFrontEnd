import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { SearchDataType, VisitDataType,UserDataType } from '../data.d';

import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
import styles from '../style.less';

const columns = [
  {
    title: (
      <FormattedMessage
        id="dataLifeCycle.table.uid"
        defaultMessage="Search keyword"
      />
    ),
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: <FormattedMessage id="dataLifeCycle.table.users" defaultMessage="Rank" />,
    dataIndex: 'userName',
    key: 'userName',
  },
  
  {
    title: <FormattedMessage id="dataLifeCycle.table.applyNumber" defaultMessage="Users" />,
    dataIndex: 'count',
    key: 'count',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  }
];

const TopSearch = ({
  loading,
  visitData2,
  tableData,
  analysisData,
}: {
  loading: boolean;
  visitData2: VisitDataType[];
  tableData: UserDataType[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      <FormattedMessage
        id="dataLifeCycle.analysis.userData"
        defaultMessage="Online Top Search"
      />
    }
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="dataLifeCycle.analysis.userApplyAmount"
                defaultMessage="search users"
              />
            </span>
          }
          gap={8}
          total={analysisData.total}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="dataLifeCycle.analysis.applyAmountPerUser"
                defaultMessage="Per Capita Search"
              />
            </span>
          }
          total={analysisData.average}
          gap={8}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
    </Row>
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={tableData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
