import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { debugLogColoumn } from './data'
import { message, Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { listAuditLog } from './service'
import { handleLogDownload } from '@/utils/utils';

/*
export interface auditLogColoumn{
  userId : String,
  userName : String,
  ip : String,
  optAt : number,
  auditLevel : number,
  auditType : number,
  optContent : String,
  optResult : number
}
*/

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  /*
  export interface debugLogColoumn{
    id : number,
    userId : String,
    username : String,
    ip : String,
    optAt : String,
    callMethodName : String,
    callDuration : number,
    optResult : number,
    queryStartAt : String,
    queryEndAt : String
  }
  */

  const columns: ProColumns<debugLogColoumn>[] = [
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
      title: '操作过程耗时(ms)',
      dataIndex: 'callDuration',
      hideInSearch: true,
    },
    {
      title: '执行结果',
      dataIndex: 'optResult',
      valueEnum: {
        '1': { text: '成功', status: "Success" },
        '2': { text: '失败', status: "Error" },
      },
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
      search: {
        transform: (value: any) => ({ startTime: new Date(value[0]).getTime(), endTime: new Date(value[1]).getTime()}),
      }
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<debugLogColoumn, debugLogColoumn>
        headerTitle="审计查询"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={(params, sorter, filter) => listAuditLog(params)}
        pagination={{
          pageSize: 15,
        }}
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => handleLogDownload({ type: 2 })}>
            <VerticalAlignBottomOutlined />
            日志导出
          </Button>,
        ]}

        beforeSearchSubmit={(params: Partial<debugLogColoumn>) => {
          /*
            username : String,
            ip : String,
            optAt : String,
            callMethodName : String,
            callDuration : number,
            optResult : number,
          */
          //console.log(params)
          const { username, optResult } = params;
          //console.log(username, optResult)
          if (username && username.length > 30) {
            message.error("操作人名称输入超出范围0-30");
            throw console.error("操作人名称输入超出范围0-30");
          }
          if (optResult && (optResult < 0 || optResult >= 3)) {
            message.error("操作结果输入超出范围0-2");
            throw console.error("资产名称输入超出范围0-30");
          }
          if (username)
            params = {...params, username: username.trim()}

          return params
        }}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
