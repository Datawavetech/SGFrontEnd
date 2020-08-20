import {
  Tag
} from 'antd';
import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { AssetProof } from './data.d';
import { listAssetProof } from './service';



const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<AssetProof>[] = [
    {
      title: '权属标识',
      dataIndex: 'dataHash',
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
      valueType: 'textarea',
    },
    {
      title: '证明',
      dataIndex: 'proof',
      valueType: 'textarea',
      hideInForm: true,
      ellipsis: true,
      width: 300,
      hideInSearch: true,
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
      render: (_, record) => (
        <>
          {record.verifyRes === 1 ? <Tag color="green">验证通过</Tag> : <Tag color="red">验证未通过</Tag>}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<AssetProof>
        headerTitle="权属证明信息"
        actionRef={actionRef}
        rowKey="dataHash"
        request={(params, sorter, filter) => listAssetProof({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
