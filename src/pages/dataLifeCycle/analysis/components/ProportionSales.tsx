import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  dropdownGroup,
  pieType,
  loading,
  pieData,
  handleChangeAnalysisType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  pieType: 'amount' | 'token';
  pieData: VisitDataType[];
  handleChangeAnalysisType?: (e: RadioChangeEvent) => void;
}) => {
  console.log(pieType, pieData)
  return (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="dataLifeCycle.analysis.systemData"
      />
    }
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group onChange={handleChangeAnalysisType}>
            <Radio.Button value="amount">
              <FormattedMessage id="dataLifeCycle.analysis.dataAmount" defaultMessage="数据量" />
            </Radio.Button>
            <Radio.Button value="token">
              <FormattedMessage id="dataLifeCycle.analysis.dataToken" defaultMessage="数据积分" />
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        {pieType==="amount" ?<FormattedMessage id="dataLifeCycle.analysis.systemDataAmount" defaultMessage="Sales" />
            :<FormattedMessage id="dataLifeCycle.analysis.systemDataToken" defaultMessage="Sales" />
        }
        
          
      </h4>
      <Pie
        hasLegend
        subTitle={pieType==="amount" ?<FormattedMessage id="dataLifeCycle.analysis.systemDataAmount" defaultMessage="Sales" />
          :<FormattedMessage id="dataLifeCycle.analysis.systemDataToken" defaultMessage="Sales" />
        }
        total={() => <div>{pieData.reduce((pre, now) => now.y + pre, 0)}</div>}
        data={pieData}
        valueFormat={(value) => <div>{value}</div>}
        height={248}
        lineWidth={4}
      />
    </div>
  </Card>
)};

export default ProportionSales;
