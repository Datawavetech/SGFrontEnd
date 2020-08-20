import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Tag, Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { listWaitingRequests, updateOnChainRequest } from './service';
import ButtonGroup from 'antd/lib/button/button-group';

const updateRequest = async (record, status) => {
  try {
    let dataStr = localStorage.getItem('tdsp');
    let token = ""
    if (dataStr !== undefined && dataStr !== null) {
      let data = JSON.parse(dataStr)
      token = data.token
    }
    const ret = await updateOnChainRequest(token, record.requestId, status);
    return ret;
  } catch (error) {
    console.log("udpateOnChainRequest failed:", error);
    return false;
  }
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();

  let dataStr = localStorage.getItem('tdsp');
  let token = ""
  if (dataStr !== undefined && dataStr !== null) {
    let data = JSON.parse(dataStr)
    token = data.token
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '申请ID',
      dataIndex: 'requestId',
      hideInForm: true,
      hideInTable: true,
      hideInSearch:true,
    },
    {
      title: '权属标识',
      dataIndex: 'dataHash',
      hideInForm: true,
      ellipsis: true,
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
    },
    {
      title: '使用约定列表',
      dataIndex: 'usages',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '数据类型列表',
      dataIndex: 'dataTypes',
      hideInForm: true,
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
        if (record.status == 2) {
          return (
            <Tag color="green">已通过</Tag>
          );
        }
        if (record.status == 3) {
          return (
            <Tag color="red">已拒绝</Tag>
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
              <Divider type="vertical"></Divider>
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
      <ProTable<TableListItem>
        headerTitle="审批单列表"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => listWaitingRequests(token, { ...params, filter })}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
