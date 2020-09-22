import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message /* Input */ } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
const handleAdd = async (token: string, fields: DataUsage) => {
  const hide = message.loading('正在添加');
  try {
    await createDataUsage(token, { ...fields });
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
const handleUpdate = async (token: string, fields: FormValueType) => {
  const hide = message.loading('正在修改');
  try {
    await updateDataUsage(token, {
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
const handleRemove = async (token: string, selectedRows: DataUsage[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteDataUsage(token, {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<DataUsage[]>([]);
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
      fieldProps: { required: true },
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
        // eslint-disable-next-line no-shadow
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" hidden={!access.canAdmin} onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建使用约定
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(access.token || '', selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={(params, sorter, filter) => listDataUsage({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={access.canAdmin ? {
          // eslint-disable-next-line no-shadow
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        } : undefined}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<DataUsage, DataUsage>
          onSubmit={async (value) => {
            const success = await handleAdd(access.token || '', value);
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
            const success = await handleUpdate(access.token || '', value);
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
