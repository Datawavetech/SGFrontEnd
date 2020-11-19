import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ConfigProvider, ActionType, zhCNIntl } from '@ant-design/pro-table';

import { DataRightConfirmInfoData } from './data';
import { listDataRightConfirmInfo } from './service';
import { message, Typography } from 'antd';


const { Text } = Typography;

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataRightConfirmInfoData>[] = [
    {
      title: '数据权属标识',
      dataIndex: 'dataHash',
      renderText: (text) => {
        return (<Text copyable={true} style={{ maxWidth: 300 }} ellipsis={true}>{text}</Text>)
      },
    },
    {
      title: '数据名称',
      dataIndex: 'dataName',
    },
    {
      title: '数据权属证明',
      dataIndex: 'proof',
      hideInSearch: true,
      renderText: (text) => {
        return (<Text copyable={true} style={{ maxWidth: 300 }} ellipsis={true}>{text}</Text>)
      },
    },
    {
      title: '数据所属人',
      dataIndex: 'sysName',
    },
    {
      title: '授权用户列表',
      dataIndex: 'authorizedUsers',
      valueType: "text",
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '最新授权时间',
      dataIndex: 'authorizeAt',
      hideInSearch: true,
    },
    {
      title: '共享次数',
      dataIndex: 'count',
      hideInSearch: true,
    }
  ];

  return (
    <PageContainer>
      <ConfigProvider value={{ intl: zhCNIntl }}>
        <ProTable<DataRightConfirmInfoData>
          headerTitle="全链路信息展示"
          actionRef={actionRef}
          rowKey="dataHash"
          beforeSearchSubmit={(params: Partial<DataRightConfirmInfoData>) => {
            const { dataHash, dataName, sysName } = params;
            if (dataHash && dataHash.length > 64) {
              message.error("数据权属标识输入超出范围0-64");
              return {};
            }
            if (dataName && dataName.length > 30) {
              message.error("数据名称输入超出范围0-30");
              return {};
            }
            if (sysName && sysName.length > 20) {
              message.error("数据名称输入超出范围0-20");
              return {};
            }
            return params;
          }}
          request={(params) => listDataRightConfirmInfo(params)}
          columns={columns}
        />
      </ConfigProvider>
    </PageContainer>
  );
};

export default TableList;
