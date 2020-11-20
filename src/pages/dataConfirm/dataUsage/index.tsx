import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message /* Input */ } from 'antd';
import React, { useState, useRef } from 'react';
import { FooterToolbar, PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { DataUsage } from './data.d';
import { listDataUsage, updateDataUsage, createDataUsage, deleteDataUsage } from './service';
import { useAccess } from 'umi'
import ButtonGroup from 'antd/lib/button/button-group';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DataUsage) => {
  const hide = message.loading('正在添加');
  try {
    await createDataUsage({ ...fields });
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
  const hide = message.loading('正在修改');
  try {
    await updateDataUsage({
      usageId: fields.usageId,
      usage: fields.usage,
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
const handleRemove = async (selectedRows: DataUsage[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteDataUsage({
      usageIds: selectedRows.map((row) => row.usageId),
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
  const [selectedRowsState, setSelectedRows] = useState<DataUsage[]>([]);
  const actionRef = useRef<ActionType>();
  const access = useAccess()
  const columns: ProColumns<DataUsage>[] = [
    {
      title: 'id',
      dataIndex: 'usageId',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '使用约定',
      dataIndex: 'usage',
      formItemProps: { rules: [{ required: true, message: "使用约定为必填项" }, { max: 20, message: "输入长度超出范围0-20" }] },
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canAdmin,
      render: (_, record) => (
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
      <ProTable<DataUsage>
        headerTitle="使用约定信息"
        actionRef={actionRef}
        rowKey="usageId"
        toolBarRender={() => [
          <Button type="primary" hidden={!access.canAdmin} onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建使用约定
          </Button>
        ]}
        beforeSearchSubmit={(params: Partial<DataUsage>) => {
          const { usage } = params;
          if (usage && usage.length > 20) {
            message.error("使用约定输入超出范围0-20");
            throw console.error("使用约定输入超出范围0-20");
          }
          return params;
        }}
        request={(params, sorter, filter) => listDataUsage({ ...params, sorter, filter })}
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
        <ProTable<DataUsage, DataUsage>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="usageId"
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
