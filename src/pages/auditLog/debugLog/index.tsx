import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { debugLogColoumn } from './data'
import { message, Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import {listAuditLog} from './service'

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
      title : "日志ID",
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
      dataIndex : 'callMethodName',
      hideInSearch: true
    },
    {
      title: '操作过程耗时(ms)',
      dataIndex : 'callDuration',
      hideInSearch: true
    },
    {
      title: '执行结果',
      dataIndex: 'optResult'
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
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
      hideInSearch: true
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<debugLogColoumn, debugLogColoumn>
        headerTitle="审计查询"
        actionRef={actionRef}
        rowKey="logId"
        columns={columns}
        request={(params, sorter, filter) => listAuditLog(params)}
        pagination={{
          pageSize: 15,
        }}
        toolBarRender={() => [
          <Button key="3" type="primary">
            <VerticalAlignBottomOutlined />
            日志导出
          </Button>,
        ]}

        beforeSearchSubmit={(params) => {
          console.log(params)
            return params
          }
        }
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
