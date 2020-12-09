import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, InputNumber } from 'antd';
import React, { useState, useRef } from 'react';
import { FooterToolbar, PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TokenModel } from './data.d';
import { listTokenModel, updateTokenModel, createTokenModel, deleteTokenModel } from './service';
import ButtonGroup from 'antd/lib/button/button-group';
import { useAccess } from 'umi';

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
  const [selectedRowsState, setSelectedRows] = useState<TokenModel[]>([]);
  const actionRef = useRef<ActionType>();
  const access = useAccess();
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
      formItemProps: { rules: [{ required: true, message: "模型名称为必填项" }, { max: 20, message: "输入长度超出范围0-20" }] },
    },
    {
      title: '模型描述',
      dataIndex: 'modelDesc',
      formItemProps: { rules: [{ required: true, message: "模型描述为必填项" }, { max: 80, message: "输入长度超出范围0-80" }] },
      hideInSearch: true,
      valueType: "textarea",
    },
    {
      title: '上升指数',
      dataIndex: 'upCount',
      formItemProps: { rules: [{ required: true, message: "上升指数为必填项" }] },
      hideInSearch: true,
      renderFormItem: () => (
        <InputNumber min={1} max={10} />
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'isRunning',
      hideInForm: true,
      valueEnum: {
        '1': { text: '正在运行', status: 'Success' },
        '2': { text: '待运行', status: 'Processing' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.checkUri('/dataShareComment/model/update'),
      render: (_, record) => (
        <>
          <ButtonGroup>
            <Button type="primary" onClick={() => {
              handleUpdateModalVisible(true);
              record.isRunning = record.isRunning.toString();
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
        toolBarRender={() => [
          <Button hidden={!access.checkUri('/dataShareComment/model/add')} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建模型
          </Button>
        ]}
        beforeSearchSubmit={(params: Partial<TokenModel>) => {
          const { modelName, modelDesc, upCount } = params;
          if (modelName && modelName.length > 20) {
            message.error("模型名称输入超出范围0-20");
            throw console.error("模型名称输入超出范围0-20");
          }
          if (modelDesc && modelDesc.length > 80) {
            message.error("模型描述输入超出范围0-80");
            throw console.error("模型描述输入超出范围0-80");
          }
          if (upCount && (upCount > 10 || upCount < 1)) {
            message.error("上升指数输入超出范围1-10");
            throw console.error("上升指数输入超出范围1-10");
          }
          if (modelName) params = { ...params, modelName: modelName.trim() }
          if (modelDesc) params = { ...params, modelDesc: modelDesc.trim() }
          return params;
        }}
        request={(params, sorter, filter) => listTokenModel({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={access.checkUri('/dataShareComment/model/delete') ? {
          onChange: (_, selectedRows) => {
            console.log(`selectedRows:${JSON.stringify(selectedRows)}`)
            setSelectedRows(selectedRows.filter(row => row.isRunning.toString() === '2'))
          },
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
              try{
                selectedRowsState.map((item)=>{
                  console.log(item)
                  if (item.modelId === "defaultModel"){
                    throw message.error("禁止删除默认模型")
                  }
                })
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }
              catch(error)
              {

              }

            }}
          >
            批量删除
          </Button></FooterToolbar>)
      }
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
          rowKey="modelId"
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
