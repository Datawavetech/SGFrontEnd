import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { OnChainRequest, OnChainRequestForm } from './data.d';
import { listUserRequests, createOnChainRequest } from './service';
import { handleDownload } from '@/utils/utils';


/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: OnChainRequestForm) => {
  const hide = message.loading('正在添加');
  try {
    const ret = await createOnChainRequest({ ...fields });
    hide();
    if (ret) {
      message.success('申请成功');
    } else {
      message.warn('申请失败');
    }
    return true;
  } catch (error) {
    hide();
    message.error('申请失败');
    return false;
  }
};


const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [stepFormValues, setStepFormValues] = useState({});

  const columns: ProColumns<OnChainRequest>[] = [
    {
      title: '请求id',
      dataIndex: 'requestId',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      hideInForm: true,
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '数据标识',
      dataIndex: 'dataHash',
      hideInForm: true,
      width: 300,
      ellipsis: true,
    },
    {
      title: '资源路径',
      dataIndex: 'dataPath',
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '使用约定',
      dataIndex: 'usages',
      hideInSearch: true,
      fieldProps: { required: true },
    },
    {
      title: '数据类型列表',
      dataIndex: 'dataTypes',
      hideInSearch: true,
      fieldProps: { required: true },
    },
    {
      title: '资源',
      dataIndex: 'dataName',
      hideInSearch: true,
      fieldProps: { required: true },
      hideInForm: true,
      render: (text, row) => {
        return (<a onClick={() => handleDownload({ rid: row.requestId })} target="_blank" rel="noopener noreferrer" key="link">
          {text}
        </a>);
      },
    },
    {
      title: '有效期截止',
      dataIndex: 'expireAt',
      hideInSearch: true,
      fieldProps: { required: true },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        1: { text: '待审批', status: "processing" },
        2: { text: '审批通过', status: "success" },
        3: { text: '审批未通过', status: "error" }
      }

    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<OnChainRequest>
        headerTitle="权属信息"
        actionRef={actionRef}
        rowKey="requestId"
        toolBarRender={() => [
          <Button hidden={false} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 上链申请
          </Button>,
        ]}
        request={(params, sorter, filter) => listUserRequests({ ...params, filter })}
        columns={columns}
      />
      <CreateForm
        onSubmit={async (value: OnChainRequestForm) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setStepFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
        createModalVisible={createModalVisible}
      />

    </PageHeaderWrapper>
  );
};

export default TableList;
