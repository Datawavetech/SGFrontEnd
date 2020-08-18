import { DownOutlined, /* PlusOutlined, */ FormOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { AssetIdentifier } from './data.d';
import { listAssetIdentifier, updateRule, addRule } from './service';
import ButtonGroup from 'antd/lib/button/button-group';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AssetIdentifier) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      dataHash: fields.dataHash,
      assetName: fields.assetName,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: AssetIdentifier[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      dataHashs: selectedRows.map((row) => row.dataHash),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectedRowsState, setSelectedRows] = useState<AssetIdentifier[]>([]);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<AssetIdentifier>[] = [
    {
      title: '权属标识',
      dataIndex: 'dataHash',
      hideInForm: true,
      ellipsis: true,
      width: 300,
      // renderText: (val: string) => `${val} 万`,
    },
    {
      title: '资产名称',
      dataIndex: 'assetName',
      rules: [
        {
          required: true,
          message: '资产名称为必填项',
        },
      ],
    },
    {
      title: '所有者',
      dataIndex: 'assetSys',
      rules: [
        {
          required: true,
          message: '所有者为必填项',
        },
      ],
    },
    {
      title: '积分',
      dataIndex: 'token',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      hideInForm: true,
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: false,
      render: (_, record) => (
        <>
          <ButtonGroup>
            <Button type="primary" onClick={() => {
              handleUpdateModalVisible(true)
              setStepFormValues(record);
            }}>更改</Button>
            <Divider type="vertical" />
            <Button danger>删除</Button>
          </ButtonGroup>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<AssetIdentifier>
        headerTitle="权属信息"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button hidden={false} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建权属标识
          </Button>,
        ]}
        // { ...params, sorter, filter }
        request={(params, sorter, filter) => listAssetIdentifier()}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<AssetIdentifier, AssetIdentifier>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
