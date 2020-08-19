import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TokenInfo } from './data.d';
import { listTokenInfo } from './service';


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TokenInfo>[] = [
    {
      title: '用户id',
      dataIndex: 'userId',
      sorter: true,
      hideInForm: true,
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      sorter: true,
      valueEnum: {
        1: { text: '系统' },
        2: { text: '部门'},
        3: { text: '个人'},
      },
    },
    {
      title: '积分',
      dataIndex: 'token',
      sorter: true,
      hideInSearch:true,
    },
    {
      title: '积分评价',
      dataIndex: 'tokenComment',
      sorter: true,
      hideInForm: true,
      hideInSearch:true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      sorter: true,
      hideInForm: true,
      hideInSearch:true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TokenInfo>
        headerTitle="积分信息"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => listTokenInfo({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
