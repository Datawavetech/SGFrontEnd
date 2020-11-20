import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';


import { TokenInfo } from './data.d';
import { listTokenInfo } from './service';
import { message } from 'antd';


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TokenInfo>[] = [
    {
      title: '用户id',
      dataIndex: 'userId',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      valueEnum: {
        1: { text: '系统' },
        2: { text: '部门' },
        3: { text: '个人' },
      },
    },
    {
      title: '积分',
      dataIndex: 'token',
      hideInSearch: true,
    },
    {
      title: '积分评价',
      dataIndex: 'tokenComment',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      hideInForm: true,
      hideInSearch: true,
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TokenInfo>
        headerTitle="积分信息"
        actionRef={actionRef}
        rowKey="userId"
        beforeSearchSubmit={(params: Partial<TokenInfo>) => {
          const { username, userType } = params;
          if (username && username.length > 20) {
            message.error("权属标识输入超出范围0-20");
            throw console.error("权属标识输入超出范围0-20");
          }
          if (userType && (userType < 0 || userType > 3)) {
            message.error("用户类型参数异常");
            throw console.error("用户类型参数异常");
          }
          if (username) params = {...params, username: username.trim()}
          return params;
        }}
        request={(params, sorter, filter) => listTokenInfo({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
