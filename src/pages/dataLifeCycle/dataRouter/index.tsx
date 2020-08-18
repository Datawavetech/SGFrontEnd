import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
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
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
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
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
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
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '数据标识',
      dataIndex: 'dataIdentifier',
      ellipsis: true,
      width: 200,
    },
    {
      title: '一级系统名称',
      dataIndex: 'levelOneSysName',
      valueType: 'textarea',
    },
    {
      title: '一级系统数据哈希',
      dataIndex: 'levelOneSysDataHash',
      valueType: 'textarea',
    },
    {
      title: '一级系统数据创建时间',
      dataIndex: 'levelOneSysCreateAt',
      valueType: 'textarea',
    },
    {
      title: '二级系统名称',
      dataIndex: 'levelTwoSysName',
      valueType: 'textarea',
    },
    {
      title: '二级系统数据哈希',
      dataIndex: 'levelTwoSysDataHash',
      valueType: 'textarea',
    },
    {
      title: '二级系统数据创建时间',
      dataIndex: 'levelTwoSysCreateAt',
      valueType: 'textarea',
    },
    {
      title: '三级系统名称',
      dataIndex: 'levelThreeSysName',
      valueType: 'textarea',
    },
    {
      title: '三级系统数据哈希',
      dataIndex: 'levelThreeSysDataHash',
      valueType: 'textarea',
    },
    {
      title: '三级系统数据创建时间',
      dataIndex: 'levelThreeSysCreateAt',
      valueType: 'textarea',
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="数据流转信息"
        actionRef={actionRef}
        rowKey="key"
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
