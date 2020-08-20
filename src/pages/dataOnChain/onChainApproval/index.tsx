import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Tag, Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import { TableListItem } from './data.d';
import { listWaitingRequests, updateOnChainRequest } from './service';
import ButtonGroup from 'antd/lib/button/button-group';

const updateRequest = async (record, status) => {
	try{
		// TODO: 从localStorage获取token
		/*const token = localStorage.getItem("token");*/
		const token = "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzd29yZCI6ImFkbWluIiwiZXhwIjoxNTk3ODkxNjkwLCJ1c2VybmFtZSI6ImFkbWluIn0.bUs08-RakFfal6BGMPzBUY3yTu829DLcHYD9J6InUUs";
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
  
  /*const token = localStorage.getItem('token');*/
  const token = "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzd29yZCI6ImFkbWluIiwiZXhwIjoxNTk3ODkxNjkwLCJ1c2VybmFtZSI6ImFkbWluIn0.bUs08-RakFfal6BGMPzBUY3yTu829DLcHYD9J6InUUs";	

  const columns: ProColumns<TableListItem>[] = [
    {
	  title: '申请ID',
	  dataIndex: 'requestId',
	  hideInForm: true,
	  hideInTable: true,
	},
    {
      title: '权属标识',
      dataIndex: 'dataHash',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
	  ellipsis: true,
	  width: 150,
    },
    {
      title: '用户',
      dataIndex: 'username',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      sorter: true,
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
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '数据类型列表',
      dataIndex: 'dataTypes',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '有效期截止',
      dataIndex: 'expireAt',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
			if(record.status == 2) {
				return (
					<Tag color="green">已通过</Tag>
				);
			}
			if(record.status == 3) {
				return (
					<Tag color="red">已拒绝</Tag>
				);
			}
			return (
				<>
				  <ButtonGroup>
					<Button type="primary" onClick={async () => {
						const success = await updateRequest(record, 2);
						if(success) {
							message.info("成功");
							if(actionRef.current) {
								actionRef.current.reload();
							}
						} else {
							message.warn("失败");
						}
					}}>通过</Button>
					<Divider type="vertical"></Divider>
					<Button danger onClick={async () => {
						const success = await updateRequest(record, 3);
						if(success) {
							message.info("成功");
							if(actionRef.current) {
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
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" hidden={true} onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
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
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        request={(params, sorter, filter) => listWaitingRequests(token)}
        columns={columns}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable<TableListItem, TableListItem>
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
