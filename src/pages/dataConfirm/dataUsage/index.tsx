import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Carousel, Card, Button, Divider, Dropdown, Menu, message /* Input */ } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { DataUsage } from './data.d';
import { listDataUsage, updateRule, addRule, removeRule } from './service';

import styles from './index.less';
import ButtonGroup from 'antd/lib/button/button-group';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DataUsage) => {
  const hide = message.loading('正在添加');
  try {
    // { ...fields }
    await addRule();
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
      name: '',
      desc: '',
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
const handleRemove = async (selectedRows: DataUsage[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.usageId),
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
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataUsage>[] = [
    {
      title: 'id',
      dataIndex: 'usageId',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '使用约定',
      dataIndex: 'usage',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <ButtonGroup>
            <Button type="primary">更改</Button>
            <Divider type="vertical" />
            <Button danger>删除</Button>
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
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" disabled onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建使用约定
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
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>积分总计 {selectedRows.reduce((pre, item) => pre, 0)}</span>
          </div>
        )}
        request={(params, sorter, filter) => listDataUsage({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
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
      <br />
      <Card title="数据证书范例" bordered={false}>
        <Carousel className={styles.customCarousel} autoplay>
          <div>
            <h3 className={styles.fontColor}>证书图片1</h3>
          </div>
          <div>
            <h3 className={styles.fontColor}>证书图片2</h3>
          </div>
          <div>
            <h3 className={styles.fontColor}>证书图片3</h3>
          </div>
          <div>
            <h3 className={styles.fontColor}>证书图片4</h3>
          </div>
        </Carousel>
      </Card>
    </PageHeaderWrapper>
  );
};

export default TableList;
