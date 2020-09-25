import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { FooterToolbar, PageHeaderWrapper, } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { AssetIdentifier } from './data.d';
import { listAssetIdentifier, updateAssetIdentifier, createAssetIdentifier, deleteAssetIdentifier } from './service';
import ButtonGroup from 'antd/lib/button/button-group';
import { useAccess } from 'umi';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AssetIdentifier) => {
  const hide = message.loading('正在添加');
  try {
    await createAssetIdentifier({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    console.log('error:', error)
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
  const hide = message.loading('正在修改');
  try {
    await updateAssetIdentifier({
      dataHash: fields.dataHash,
      assetName: fields.assetName,
      assetSys: fields.assetSys,
    });
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
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
    await deleteAssetIdentifier({
      deleteDataHashs: selectedRows.map((row) => row.dataHash),
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRowsState, setSelectedRows] = useState<AssetIdentifier[]>([]);
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const columns: ProColumns<AssetIdentifier>[] = [
    {
      title: '权属标识',
      dataIndex: 'dataHash',
      hideInForm: true,
      ellipsis: true,
      copyable: true,
    },
    {
      title: '资产名称',
      dataIndex: 'assetName',
      formItemProps: { rules: [{ required: true, message: "资产名称为必填项" }, { max: 30, message: "输入长度超出范围" }] },
      valueType: 'text',
    },
    {
      title: '所有者',
      dataIndex: 'assetSys',
      formItemProps: { rules: [{ required: true, message: "资产所属者为必填项" }, { max: 20, message: "输入长度超出范围" }] },
      valueType: 'text',
    },
    {
      title: '积分',
      dataIndex: 'token',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canAdmin,
      render: (_: any, record: React.SetStateAction<{}>) => (
        <>
          <ButtonGroup>
            <Button type="primary" onClick={() => {
              handleUpdateModalVisible(true)
              setStepFormValues(record);
            }}>更改</Button>
          </ButtonGroup>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<AssetIdentifier, AssetIdentifier>
        headerTitle="权属信息"
        actionRef={actionRef}
        rowKey="dataHash"
        beforeSearchSubmit={(params: Partial<AssetIdentifier>) => {
          const { dataHash, assetName, assetSys } = params
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
        toolBarRender={() => [
          <Button hidden={!access.canAdmin} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建权属标识
          </Button>,
        ]}
        request={(params, sorter, filter) => listAssetIdentifier({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={access.canAdmin ? {
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        } : undefined}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            danger
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button></FooterToolbar>)
      }
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
          rowKey="dataHash"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {
        stepFormValues && Object.keys(stepFormValues).length ? (
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
        ) : null
      }
    </PageHeaderWrapper >
  );
};

export default TableList;
