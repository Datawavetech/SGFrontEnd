import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { errorLogColoumn } from './data'
import { listAuditLog } from './service'
import { message, Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { handleLogDownload } from '@/utils/utils';



/*
export interface errorLogColoumn{
  id : number,
  userId : number,
  username : String,
  ip : String,
  callMethodName : String,
  exceptionDesc : String,
  optAt : String,
  queryStartAt : String,
  queryEndAt : String
}
*/

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<errorLogColoumn>[] = [
    {
      title: "日志ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '操作员ID',
      dataIndex: 'userId',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '操作员',
      dataIndex: 'username',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      hideInSearch: true
    },
    {
      title: '调用方法名称',
      dataIndex: 'callMethodName',
      hideInSearch: true
    },
    {
      title: '异常描述',
      dataIndex: 'exceptionDesc',
      hideInSearch: true
    },
    {
      title: '操作时间',
      dataIndex: 'optAt',
      hideInSearch: true
    },
    {
      title: '时间区间',
      dataIndex: 'queryTimeRange',
      valueType: 'dateTimeRange',
      hideInTable: true,
      hideInSearch: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    }
  ];


  return (
    <PageHeaderWrapper>
      <ProTable<errorLogColoumn, errorLogColoumn>
        headerTitle="审计查询"
        actionRef={actionRef}
        rowKey="logId"
        columns={columns}
        request={(params, sorter, filter) => listAuditLog(params)}
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => handleLogDownload({ type: 3 })}>
            <VerticalAlignBottomOutlined />
            日志导出
          </Button>,
        ]}
        beforeSearchSubmit={(params: Partial<errorLogColoumn>) => {
          /*
            username : String,
            ip : String,
            optAt : String,
            callMethodName : String,
            callDuration : number,
            optResult : number,
          */
          const { username } = params;

          if (username && username.length > 30) {
            message.error("操作人名称输入超出范围0-30");
            throw console.error("操作人名称输入超出范围0-30");
          }
          if (username) params = {...params, username: username.trim()}
          return params;
        }}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
