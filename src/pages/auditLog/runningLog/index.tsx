import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { runningLogColoumn, TableListParam } from './data'
import { message, Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { listAuditLog } from './service'
import { handleDownload, handleLogDownload } from '@/utils/utils';

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
      title: '审计类型',
      dataIndex: 'auditType',
      valueEnum: {
        '1': { text: '菜单资源访问' },
        '2': { text: '数据资源访问' },
        '3': { text: '业务内容新增' },
        '4': { text: '业务内容删除' },
        '5': { text: '业务内容修改' }
      }
    },
    {
      title: '操作内容',
      dataIndex: 'optContent',
      hideInSearch: true
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
      hideInSearch: true,
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<runningLogColoumn, TableListParam>
        headerTitle="审计查询"
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={(params, sorter, filter) => listAuditLog(params)}
        toolBarRender={() => [
          <Button key="3" type="primary" onClick={() => handleLogDownload({ type: 1 })}>
            <VerticalAlignBottomOutlined />
            日志导出
          </Button>,
        ]}
        beforeSearchSubmit={(params: Partial<runningLogColoumn>) => {
          /*
            username : String,
            ip : String,
            optAt : String,
            callMethodName : String,
            callDuration : number,
            optResult : number,
          */
          const { username, optResult, auditType } = params;

          if (username && username.length > 30) {
            message.error("操作人名称输入超出范围0-30");
            throw console.error("操作人名称输入超出范围0-30");
          }
          if (optResult && (optResult < 0 || optResult >= 3)) {
            message.error("操作结果输入超出范围0-2");
            throw console.error("操作结果输入超出范围0-2");
          }
          if (auditType && (auditType < 1 || auditType > 5)){
            message.error("审计类型输入超出范围1-5");
            throw console.error("审计类型输入超出范围1-5");
          }
          if (username) params = {...params, username: username.trim()}
          return params;
        }}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
