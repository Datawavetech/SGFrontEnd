import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';


import { TableListItem } from './data.d';
import { listUserKeyInfo } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      hideInForm: true,
      valueEnum: {
        1: { text: '系统' },
        2: { text: '部门' },
        3: { text: '用户' }
      }
    },
    {
      title: '私钥',
      dataIndex: 'priKey',
      ellipsis: true,
      width: 300,
      hideInSearch: true,
    },
    {
      title: '公钥',
      dataIndex: 'pubKey',
      ellipsis: true,
      width: 300,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInSearch: true,
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="用户信息"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => listUserKeyInfo({ ...params, sorter, filter })}
        columns={columns}
      // rowSelection={{}}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
