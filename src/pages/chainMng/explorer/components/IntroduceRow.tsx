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

const IntroduceRow = ({ loading, visitData, visitData2, visitData3, visitData4}: { loading: boolean; visitData: VisitDataType[]; visitData2: VisitDataType[]; visitData3: VisitDataType[]; visitData4: VisitDataType[] }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.blockheight" defaultMessage="Visits" />}
        total={numeral(85).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.txamount" defaultMessage="Visits" />}
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(31).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#970325" data={visitData2} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.realtimetx" defaultMessage="Visits" />}
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(2).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#055336" data={visitData3} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="chainMng.explorer.latestblocks" defaultMessage="Visits" />}
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="dashboardandanalysis.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(85).format('0,0')}
        contentHeight={80}
      >
        <MiniArea color="#322554" data={visitData4} />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
