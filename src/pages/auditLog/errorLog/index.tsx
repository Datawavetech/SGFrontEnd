import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { errorLogColoumn } from './data'
import {listAuditLog} from './service'
import { message, Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';



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
      formItemProps: { rules: [{ required: true, message: "模型名称为必填项" }, { max: 20, message: "输入长度超出范围0-20" }] },
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
