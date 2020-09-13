import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { DataTraceability } from './data.d';
import { listTraceability } from './service';


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataTraceability>[] = [
    {
      title: '资源名称',
      dataIndex: 'assetName',
      rules: [
        {
          required: true,
          message: '资源名称为必填项',
        },
      ],
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
        rowKey="createAt"
        request={(params, sorter, filter) => listTraceability({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
