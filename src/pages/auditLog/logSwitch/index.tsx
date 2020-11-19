import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { changeLogSwitch, getLogSwitchStatus } from './service'
import { message, Card , Button, Divider } from 'antd';


/*
export interface auditLogColoumn{
  userId : String,
  userName : String,
  ip : String,
  optAt : number,
  auditLevel : number,
  auditType : number,
  optContent : String,
  optResult : number
}
*/

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  let [switchStatus, setSwitchStatus] = useState<boolean>(false);

  useEffect(() => {
    async function freshStatus(){
        let a = await getLogSwitchStatus()
        if (a.data.status != undefined){
          setSwitchStatus(a.data.status===1? true: false)
        }
    }
    freshStatus()
  }, [switchStatus]);



  //TODOGAVIN STATUS
  const clickOpenLog = async () => {
    await changeLogSwitch(1)
    setSwitchStatus(true)
  }

  const clickCloseLog = async () => {
    await changeLogSwitch(2)
    setSwitchStatus(false)
  }

  return (
    <PageHeaderWrapper>
      <Card>
        <p>当前状态：{switchStatus? "日志已开启": "日志已关闭"}</p>
        <Button type="primary" disabled = {switchStatus} onClick={clickOpenLog}> 开启日志 </Button>
        <Button type="primary" disabled = {!switchStatus} onClick={clickCloseLog}> 关闭日志 </Button>
      </Card>
    </PageHeaderWrapper>
  );
};

export default TableList;
