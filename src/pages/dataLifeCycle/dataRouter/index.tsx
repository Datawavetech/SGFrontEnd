import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { DataRouter, TableListParams } from './data';
import { listDataRouter } from './service';
import { message, Typography } from 'antd';

const { Text } = Typography;

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<DataRouter>[] = [
    {
      title: '数据标识',
      dataIndex: 'dataIdentifier',
      ellipsis: true,
      width: 200,
    },
    {
      title: '一级系统名称',
      dataIndex: 'levelOneSys',
      valueType: 'textarea',
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return sys.sysName;
        }
        return "";
      },
    },
    {
      title: '一级系统数据哈希',
      dataIndex: 'levelOneSys',
      valueType: 'textarea',
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return (<Text copyable={true} style={{ maxWidth: 100 }} ellipsis={true}>{sys.dataHash}</Text>);
        }
        return "";
      },
      hideInSearch: true,
    },
    {
      title: '一级系统数据创建时间',
      dataIndex: 'levelOneSys',
      valueType: 'textarea',
      hideInSearch: true,
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return sys.createAt;
        }
        return "";
      },
    },
    {
      title: '二级系统名称',
      dataIndex: 'levelTwoSys',
      valueType: 'textarea',
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return sys.sysName;
        }
        return "";
      },
    },
    {
      title: '二级系统数据哈希',
      dataIndex: 'levelTwoSys',
      valueType: 'textarea',
      hideInSearch: true,
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return (<Text copyable={true} style={{ maxWidth: 100 }} ellipsis={true}>{sys.dataHash}</Text>);
        }
        return "";
      },

    },
    {
      title: '二级系统数据创建时间',
      dataIndex: 'levelTwoSys',
      valueType: 'textarea',
      hideInSearch: true,
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return sys.createAt;
        }
        return "";
      },
    },
    {
      title: '三级系统名称',
      dataIndex: 'levelThreeSys',
      valueType: 'textarea',
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return sys.sysName;
        }
        return "";
      },
    },
    {
      title: '三级系统数据哈希',
      dataIndex: 'levelThreeSys',
      valueType: 'textarea',
      hideInSearch: true,
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return (<Text copyable={true} style={{ maxWidth: 100 }} ellipsis={true}>{sys.dataHash}</Text>);
        }
        return "";
      },
    },
    {
      title: '三级系统数据创建时间',
      dataIndex: 'levelThreeSys',
      valueType: 'textarea',
      hideInSearch: true,
      renderText: (sys) => {
        if (sys !== undefined && sys !== null) {
          return sys.createAt;
        }
        return "";
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<DataRouter>
        headerTitle="数据流转信息"
        actionRef={actionRef}
        rowKey="dataIdentifier"
        beforeSearchSubmit={(params: Partial<DataRouter>) => {
          const { dataIdentifier, levelOneSys, levelTwoSys, levelThreeSys } = params;
          if (dataIdentifier && dataIdentifier.length > 20) {
            message.error("一级系统名称输入超出范围0-20");
            return {};
          }
          if (levelOneSys && levelOneSys.toString().length > 20) {
            message.error("一级系统名称输入超出范围0-20");
            return {};
          }
          if (levelTwoSys && levelTwoSys.toString().length > 20) {
            message.error("二级系统名称输入超出范围0-20");
            return {};
          }
          if (levelThreeSys && levelThreeSys.toString().length > 20) {
            message.error("三级系统名称输入超出范围0-20");
            return {};
          }
          var modifiedParams: TableListParams = {};
          modifiedParams.dataIdentifier = dataIdentifier;
          modifiedParams.levelOneSysName = levelOneSys?.toString();
          modifiedParams.levelTwoSysName = levelTwoSys?.toString();
          modifiedParams.levelThreeSysName = levelThreeSys?.toString();
          return modifiedParams;
        }}
        request={(params, sorter, filter) => listDataRouter({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
