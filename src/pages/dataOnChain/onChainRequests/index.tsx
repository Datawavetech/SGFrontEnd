import { DownOutlined, UploadOutlined, /* PlusOutlined, */ FormOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, DatePicker, Upload, Button, Dropdown, Menu, message, Divider } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import FormItem from 'antd/lib/form/FormItem';

import CreateForm from './components/CreateForm';
import { OnChainRequest, OnChainRequestForm } from './data.d';
import { listOnChainRequest, createOnChainRequest, updateOnChainRequest } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: OnChainRequest) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    // 登录获取token->保存到localStorage->从localStorage获取token进行私有接口请求
  	let token = "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzd29yZCI6InRlc3QiLCJleHAiOjE1OTc3NDIzMzcsInVzZXJuYW1lIjoidGVzdCJ9.fDEQTaVD3GZaCoy5tW8N4veAaNdVeAtP6b-QYu1p7lE";
    await createOnChainRequest(token, { ...fields });
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
      hideInSearch: true,
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
      sorter: true,
      hideInSearch: true,
	  renderFormItem: () => (
	  	<FormItem
        name="usages"
        label="数据使用约定"
        rules={[{ required: true, message: '请输入数据使用约定！' }]}
      	>
        	<Input placeholder="请输入" />
		</FormItem>
	  )
    },
    {
      title: '数据类型列表',
      dataIndex: 'dataTypes',
      sorter: true,
      hideInSearch: true,
	  renderFormItem: () => (
	  	<FormItem
        name="dataTypes"
        label="数据类型列表"
        rules={[{ required: true, message: '请输入数据类型列表！' }]}
      	>
        	<Input placeholder="请输入" />
		</FormItem>
	  )
    },
    {
      title: '有效期截止',
      dataIndex: 'expireAt',
      hideInSearch: true,
	  renderFormItem: () => (
	  	<FormItem
        name="expireAt"
        label="数据有效期"
        rules={[{ required: true, }]}
      	>
	  		<DatePicker />
		</FormItem>
	  )
    },
	{
	  title: '文件',
	  dataIndex: 'file',
	  hideInTable: true,
	  hideInSearch: true,
	  renderFormItem: () => (
	  	<FormItem
        name="file"
        label="文件"
        rules={[{ required: true, }]}
		>
			<Upload>
			  <Button>
				<UploadOutlined /> Upload
			  </Button>
			</Upload>
		</FormItem>
	  )
	},
    {
      title: '状态',
      dataIndex: 'status',
	  hideInForm: true,
      hideInSearch: true,
      valueEnum: {
        1: { text: '待审批', status: "processing" },
        2: { text: '已审批', status: "success" },
        3: { text: '已拒绝', status: "error" }
      }
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<OnChainRequest>
        headerTitle="权属信息"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button hidden={false} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 上链申请
          </Button>,
        ]}
        // { ...params, sorter, filter }
        request={(params, sorter, filter) => listOnChainRequest()}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<OnChainRequestForm, OnChainRequestForm>
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
    </PageHeaderWrapper>
  );
};

export default TableList;
