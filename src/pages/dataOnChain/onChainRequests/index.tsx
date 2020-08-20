import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Tag, Select, DatePicker, Upload, Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import FormItem from 'antd/lib/form/FormItem';

import CreateForm from './components/CreateForm';
import { OnChainRequest, OnChainRequestForm } from './data.d';
import { listUserRequests, createOnChainRequest, listDataTypes, listUsages } from './service';

const { Option } = Select;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: OnChainRequest) => {
  console.log(fields);
  const hide = message.loading('正在添加');
  try {
    // 登录获取token->保存到localStorage->从localStorage获取token进行私有接口请求
	/*let token = localStorage.getItem('token');*/
	let token = "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzd29yZCI6ImFkbWluIiwiZXhwIjoxNTk3ODkxNjkwLCJ1c2VybmFtZSI6ImFkbWluIn0.bUs08-RakFfal6BGMPzBUY3yTu829DLcHYD9J6InUUs";
    let ret = await createOnChainRequest(token, { ...fields });
    hide();
	if(ret) {
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

const handleChange = async (value: string[]) => {
  console.log(value);
}

const getDataTypes = async () => {
  try {
    const resp = await listDataTypes();
    const types = [];
    for (let i = 0; i < resp.data.length; ++i) {
      types.push(<Option key={resp.data[i].typeName}>{resp.data[i].typeName}</Option>);
    }
    console.log('types:', types);
    return types;
  } catch (error) {
    console.log('listDataTypes failed:', error);
    return [];
  }
}

const getDataUsages = async () => {
  try {
    const resp = await listUsages();
    const usages = [];
    for (let i = 0; i < resp.data.length; ++i) {
      usages.push(<Option key={resp.data[i].usage}>{resp.data[i].usage}</Option>);
    }
    console.log('usages:', usages);
    return usages;
  } catch (error) {
    console.log('listUsages failed:', error);
    return [];
  }
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectedRowsState, setSelectedRows] = useState<AssetIdentifier[]>([]);
  const actionRef = useRef<ActionType>();

  /*const token = localStorage.getItem('token');*/
  const token = "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzd29yZCI6ImFkbWluIiwiZXhwIjoxNTk3ODkxNjkwLCJ1c2VybmFtZSI6ImFkbWluIn0.bUs08-RakFfal6BGMPzBUY3yTu829DLcHYD9J6InUUs";

  const [usageList, setUsageList] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  useEffect(() => {
    (async () => {
      const usages = await getDataUsages();
      setUsageList(usages);
      const types = await getDataTypes();
      setDataTypes(types);
    })();
  }, []);

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
      sorter: true,
      hideInSearch: true,
      renderFormItem: () => (
        <FormItem
          name="usages"
          label="数据使用约定"
		  rules={[{ required: true, message: '请输入数据使用约定！' }]}
        >
			<Select
			  mode="multiple"
			  placeholder="Please select"
			  defaultValue={['报表']}
			  onChange={handleChange}
			  style={{ width: '100%' }}
			>
			  {usageList}
			</Select>
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
			<Select
			  mode="multiple"
			  placeholder="Please select"
			  defaultValue={['报表']}
			  onChange={handleChange}
			  style={{ width: '100%' }}
			>
			  {dataTypes}
			</Select>
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
      hideInForm: true,
	  render: (_, record) => {
	  	if(record.status == 2) {
			return (<Tag color="green">已通过</Tag>);
		}
		if(record.status == 3) {
			return (<Tag color="red">已拒绝</Tag>);
		}
		return (<Tag color="yellow">待审核</Tag>);
	  },
/*      valueEnum: {*/
        /*1: { text: '待审批', status: "processing" },*/
        /*2: { text: '已审批', status: "success" },*/
        /*3: { text: '已拒绝', status: "error" }*/
      /*}*/
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
        request={(params, sorter, filter) => listUserRequests(token)}
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
