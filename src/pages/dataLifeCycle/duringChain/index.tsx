import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { DcmcChainData } from './data.d';
import { listDcmcDataRouter } from './service';


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DcmcChainData>[] = [
    {
      title: '数据哈希',
      dataIndex: 'dataHash',
      ellipsis: true,
      width: 200,
    },
    {
      title: '数据名称',
      dataIndex: 'dataName',
    },
    {
      title: '数据权属证明',
      dataIndex: 'proof',
      ellipsis: true,
      width: 200,
      hideInSearch: true,
    },
    {
      title: '授权用户列表',
      dataIndex: 'authorizedUsers',
      ellipsis: true,
      width: 250,
      hideInSearch: true,
    },
    {
      title: '最新授权时间',
      dataIndex: 'authorizeAt',
      hideInSearch: true,
    },
    {
      title: '共享次数',
      dataIndex: 'count',
      hideInSearch: true,
    }
  ];

  return (
    <PageContainer>
      <ProTable<DcmcChainData>
        headerTitle="全链路信息展示"
        actionRef={actionRef}
        rowKey="dataHash"

        request={(params) => listDcmcDataRouter(params)}
        columns={columns}
      />

    </PageContainer>
  );
};

export default TableList;
