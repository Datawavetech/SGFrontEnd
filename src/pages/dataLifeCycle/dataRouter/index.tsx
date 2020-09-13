import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { DataRouter } from './data';
import { listDataRouter } from './service';



const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataRouter>[] = [
    {
      title: '数据标识',
      dataIndex: 'dataIdentifier',
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '一级系统名称',
      dataIndex: 'levelOneSysName',
      valueType: 'textarea',
    },
    {
      title: '一级系统数据哈希',
      dataIndex: 'levelOneSysDataHash',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: '一级系统数据创建时间',
      dataIndex: 'levelOneSysCreateAt',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '二级系统名称',
      dataIndex: 'levelTwoSysName',
      valueType: 'textarea',
    },
    {
      title: '二级系统数据哈希',
      dataIndex: 'levelTwoSysDataHash',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: '二级系统数据创建时间',
      dataIndex: 'levelTwoSysCreateAt',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '三级系统名称',
      dataIndex: 'levelThreeSysName',
      valueType: 'textarea',
    },
    {
      title: '三级系统数据哈希',
      dataIndex: 'levelThreeSysDataHash',
      valueType: 'textarea',
      hideInSearch: true,
      ellipsis: true,
      width: 100,
    },
    {
      title: '三级系统数据创建时间',
      dataIndex: 'levelThreeSysCreateAt',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<DataRouter>
        headerTitle="数据流转信息"
        actionRef={actionRef}
        rowKey="dataIdentifier"
        request={(params, sorter, filter) => listDataRouter({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
