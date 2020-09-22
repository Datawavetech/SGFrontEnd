import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Tag, Select, DatePicker, Upload, Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import FormItem from 'antd/lib/form/FormItem';

import CreateForm from './components/CreateForm';
import { OnChainRequest, OnChainRequestForm } from './data.d';
import { useAccess } from 'umi';
import { listUserRequests, createOnChainRequest, listDataTypes, listUsages } from './service';

const { Option } = Select;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (token: string, fields: OnChainRequest) => {
  const hide = message.loading('正在添加');
  try {
    // 登录获取token->保存到localStorage->从localStorage获取token进行私有接口请求
    let ret = await createOnChainRequest(token, { ...fields });
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
    return usages;
  } catch (error) {
    console.log('listUsages failed:', error);
    return [];
  }
}

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const access = useAccess()
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
      hideInSearch: true,
      formItemProps: { required: true },
      renderFormItem: () => (
        <Select
          mode="multiple"
          placeholder="Please select"
          defaultValue={['报表']}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {usageList}
        </Select>
      )
    },
    {
      title: '数据类型列表',
      dataIndex: 'dataTypes',
      hideInSearch: true,
      formItemProps: { required: true },
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        return (
          <Select
            mode="multiple"
            placeholder="Please select"
            defaultValue={['报表']}
            onChange={handleChange}
            style={{ width: '100%' }}
          >
            {dataTypes}
          </Select>
        )
      }
    },
    {
      title: '有效期截止',
      dataIndex: 'expireAt',
      hideInSearch: true,
      formItemProps: { required: true },
      renderFormItem: () => (
        <DatePicker />
      )
    },
    {
      title: '文件',
      dataIndex: 'file',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: { required: true },
      renderFormItem: () => (
        <Upload>
          <Button>
            <UploadOutlined /> Upload
			  </Button>
        </Upload>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => {
        if (record.status == 2) {
          return (<Tag color="green">已通过</Tag>);
        }
        if (record.status == 3) {
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
        rowKey="requestId"
        toolBarRender={() => [
          <Button hidden={false} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 上链申请
          </Button>,
        ]}
        // { ...params, sorter, filter }
        request={(params, sorter, filter) => listUserRequests(access.token || '', { ...params, filter })}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<OnChainRequestForm, OnChainRequestForm>
          onSubmit={async (value) => {
            const success = await handleAdd(access.token || '', value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="requestId"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
    </PageHeaderWrapper>
  );
};

export default TableList;
