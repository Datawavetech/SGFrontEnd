import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, InputNumber } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TokenModel } from './data.d';
import { listTokenModel, updateTokenModel, createTokenModel, deleteTokenModel } from './service';
import ButtonGroup from 'antd/lib/button/button-group';
import FormItem from 'antd/lib/form/FormItem';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TokenModel) => {
  const hide = message.loading('正在添加');
  try {
    await createTokenModel({ ...fields });
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
    await updateTokenModel({
      modelId: fields.modelId,
      modelName: fields.modelName,
      modelDesc: fields.modelDesc,
      upCount: fields.upCount,
      isRunning: fields.isRunning,
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
const handleRemove = async (selectedRows: TokenModel[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteTokenModel({
      modelIds: selectedRows.map((row) => row.modelId),
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
  const [selectedRows, setSelectedRows] = useState<TokenModel[]>([]);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TokenModel>[] = [
    {
      title: '模型id',
      dataIndex: 'modelId',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '模型名称',
      dataIndex: 'modelName',
      rules: [
        {
          required: true,
          message: '模型名称为必填项',
        },
      ],
    },
    {
      title: '模型描述',
      dataIndex: 'modelDesc',
      sorter: true,
      rules: [
        {
          required: true,
          message: '模型描述为必填项',
        },
      ],
      hideInSearch: true,
    },
    {
      title: '上升指数',
      dataIndex: 'upCount',
      sorter: true,
      rules: [
        {
          required: true,
          message: '上升指数为必填项',
        },
      ],
      hideInSearch: true,
      renderFormItem: () => (
        <FormItem
          name="upCount"
          label="上升指数"
        >
          <InputNumber min={1} max={10} />
        </FormItem>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'isRunning',
      hideInForm: true,
      valueEnum: {
        1: { text: '正在运行', status: 'Success' },
        2: { text: '待运行', status: 'Processing' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
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
      <ProTable<TokenModel>
        headerTitle="模型信息"
        actionRef={actionRef}
        rowKey="modelId"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建模型
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
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
        request={(params, sorter, filter) => listTokenModel({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TokenModel, TokenModel>
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
          rowSelection={{}}
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
