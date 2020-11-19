import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { DataTraceability } from './data.d';
import { listTraceability } from './service';
import { message } from 'antd';


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataTraceability>[] = [
    {
      title: '资源名称',
      dataIndex: 'assetName',
    },
    {
      title: '源端系统',
      dataIndex: 'sourceSys',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<DataTraceability>
        headerTitle="溯源信息"
        actionRef={actionRef}
        beforeSearchSubmit={(params: Partial<DataTraceability>) => {
          const { assetName, sourceSys } = params;
          if (assetName && assetName.length > 30) {
            message.error("资产名称输入超出范围0-30");
            return {};
          }
          if (sourceSys && sourceSys.length > 20) {
            message.error("源端系统输入超出范围0-20");
            return {};
          }
          return params;
        }}
        rowKey="assetName"
        request={(params, sorter, filter) => listTraceability({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
