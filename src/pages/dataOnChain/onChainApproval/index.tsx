import { Tag, Button, Divider, message } from 'antd';
import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { OnChainRequest } from './data.d';
import { listWaitingRequests, updateOnChainRequest } from './service';
import ButtonGroup from 'antd/lib/button/button-group';
import { useAccess } from 'umi';
import { handleDownload } from '@/utils/utils';

const updateRequest = async (record: OnChainRequest, status: number) => {
  try {
    const ret = await updateOnChainRequest(record.requestId, status);
    return ret;
  } catch (error) {
    console.log("udpateOnChainRequest failed:", error);
    return false;
  }
}

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const access = useAccess()
  const columns: ProColumns<OnChainRequest>[] = [
    {
      title: '申请ID',
      dataIndex: 'requestId',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '权属标识',
      dataIndex: 'dataHash',
      hideInForm: true,
      ellipsis: true,
      copyable: true,
      width: 150,
    },
    {
      title: '用户',
      dataIndex: 'username',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '资产名称',
      dataIndex: 'dataName',
      hideInForm: true,
      render: (text, row) => {
        return (<a onClick={() => handleDownload({ rid: row.requestId })} target="_blank" rel="noopener noreferrer" key="link">
          {text}
        </a>);
      },
    },
    {
      title: '使用约定列表',
      dataIndex: 'usages',
      hideInForm: true,
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '数据类型列表',
      dataIndex: 'dataTypes',
      hideInForm: true,
      ellipsis: true,
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '有效期截止',
      dataIndex: 'expireAt',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record.status === 2) {
          return (
            <Tag color="green">审批通过</Tag>
          );
        }
        if (record.status === 3) {
          return (
            <Tag color="red">审批未通过</Tag>
          );
        }
        return (
          <>
            <ButtonGroup>
              <Button type="primary" onClick={async () => {
                const success = await updateRequest(record, 2);
                if (success) {
                  message.info("成功");
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                } else {
                  message.warn("失败");
                }
              }}>通过</Button>
              <Divider type="vertical" />
              <Button danger onClick={async () => {
                const success = await updateRequest(record, 3);
                if (success) {
                  message.info("成功");
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                } else {
                  message.warn("失败");
                }
              }}>拒绝</Button>
            </ButtonGroup>
          </>
        );
      }
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<OnChainRequest>
        headerTitle="审批单列表"
        actionRef={actionRef}
        rowKey="requestId"
        request={(params, sorter, filter) => listWaitingRequests({ ...params, filter })}
        columns={columns}
        beforeSearchSubmit={(params: Partial<OnChainRequest>) => {
          const { dataHash, dataName } = params;
          if (dataHash && dataHash.length >= 65 ) {
            message.error("权属标示输入超出64位");
            throw console.error("权属标示输入超出64位")
          }
          if (dataName && dataName.length >= 30 ) {
            message.error("资产名称输入超出范围0-30位");
            throw console.error("资产名称输入超出范围0-30位")
          }
          return params;
        }}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
