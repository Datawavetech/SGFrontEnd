import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { runningLogColoumn } from './data'
import { message, Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { listAuditLog } from './service'

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

  {
    "id":1432,
    "userId":7,
    "username":"tdsp@Admin",
    "ip":"127.0.0.1",
    "auditType":3,
    "optContent":"访问菜单：权属证明",
    "optResult":1,
    "exceptionDesc":null,
    "optAt":"2020-11-19 12:59:28"
  },

  */
  const columns: ProColumns<runningLogColoumn>[] = [
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
      title: '审计类型',
      dataIndex: 'auditType'
    },
    {
      title: '操作内容',
      dataIndex: 'optContent',
      hideInSearch: true
    },
    {
      title: '执行结果',
      dataIndex: 'optResult',

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
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<runningLogColoumn, runningLogColoumn>
        headerTitle="审计查询"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={(params, sorter, filter) => listAuditLog(params)}
        toolBarRender={() => [
          <Button key="3" type="primary">
            <VerticalAlignBottomOutlined />
            日志导出
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
