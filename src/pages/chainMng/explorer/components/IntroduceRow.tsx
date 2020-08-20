import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, Field } from './Charts';
import { VisitDataType } from '../data';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, blockHeightData, txAmountData, realTimeTxAmountData, realTimeBlockHeightData}: { loading: boolean; blockHeightData: VisitDataType[]; txAmountData: VisitDataType[]; realTimeTxAmountData: VisitDataType[]; realTimeBlockHeightData: VisitDataType[];}) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.blockheight" defaultMessage="Visits" />}
        total={numeral(blockHeightData[blockHeightData.length-1].y).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#975FE4" data={blockHeightData} line/>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.latestblocks" defaultMessage="Visits" />}
        total={numeral(realTimeBlockHeightData[realTimeBlockHeightData.length-1].y).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#322554" data={realTimeBlockHeightData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.txamount" defaultMessage="Visits" />}
        total={numeral(txAmountData[txAmountData.length-1].y).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#970325" data={txAmountData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.realtimetx" defaultMessage="Visits" />}
        total={numeral(realTimeTxAmountData[realTimeTxAmountData.length-1].y).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#055336" data={realTimeTxAmountData} />
      </ChartCard>
    </Col>
    
  </Row>
);

export default IntroduceRow;
