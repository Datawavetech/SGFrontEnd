import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';


import { UserKeyInfo } from './data.d';
import { listUserKeyInfo } from './service';
import { message, Typography } from 'antd';

const { Text } = Typography;

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<UserKeyInfo>[] = [
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
      valueType: "textarea",
      hideInSearch: true,
      renderText: (text) => {
        return (<Text copyable={true} style={{ maxWidth: 300 }} ellipsis={true}>{text}</Text>)
      },
    },
    {
      title: '公钥',
      dataIndex: 'pubKey',
      valueType: "textarea",
      hideInSearch: true,
      renderText: (text) => {
        return (<Text copyable={true} style={{ maxWidth: 300 }} ellipsis={true}>{text}</Text>)
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInSearch: true,
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<UserKeyInfo>
        headerTitle="用户信息"
        actionRef={actionRef}
        rowKey="userId"
        beforeSearchSubmit={(params: Partial<UserKeyInfo>) => {
          const { name, userType } = params;
          if (name && name.length > 20) {
            message.error("用户名输入超出范围0-20");
            return {};
          }
          if (userType && (userType < 0 || userType > 3)) {
            message.error("用户类型输入异常");
            return {};
          }
          return params;
        }}
        request={(params, sorter, filter) => listUserKeyInfo({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
