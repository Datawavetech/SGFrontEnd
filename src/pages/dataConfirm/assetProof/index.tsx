import {
  message,
  Tag
} from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { AssetProof, TableListParams } from './data.d';
import { listAssetProof } from './service';


const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<AssetProof>[] = [
    {
      title: '权属标识',
      dataIndex: 'dataHash',
      copyable: true,
      ellipsis: true,
      width: 300,
    },
    {
      title: '资产名称',
      dataIndex: 'assetName',
      valueType: 'textarea',
    },
    {
      title: '所有者',
      dataIndex: 'assetSys',
      valueType: 'text',
    },
    {
      title: '证明',
      dataIndex: 'proof',
      hideInForm: true,
      hideInSearch: true,
      width: 300,
      copyable: true,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      hideInSearch: true,
    },
    {
      title: '验证结果',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: { verifyRes: number; }) => (
        <>
          {record.verifyRes === 1 ? <Tag color="green">验证通过</Tag> : <Tag color="red">验证未通过</Tag>}
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<AssetProof>
        headerTitle="权属证明信息"
        actionRef={actionRef}
        rowKey="dataHash"
        beforeSearchSubmit={(params: Partial<AssetProof>) => {
          const { dataHash, assetName, assetSys } = params;
          if (dataHash && dataHash.length > 64) {
            message.error("权属标识输入超出范围0-64");
            return {};
          }
          if (assetName && assetName.length > 30) {
            message.error("资产名称输入超出范围0-30");
            return {};
          }
          if (assetSys && assetSys.length > 20) {
            message.error("所属者输入超出范围0-20");
            return {};
          }
          return params;
        }}
        request={(params: TableListParams | undefined, sorter: any, filter: any) => listAssetProof({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
