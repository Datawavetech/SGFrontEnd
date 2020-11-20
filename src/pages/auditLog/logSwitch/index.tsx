import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { changeLogSwitch, getLogSwitchStatus } from './service'
import { message, Card , Button, Divider, Descriptions } from 'antd';


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
  let [logSize, setLogSize] = useState("1MB");
  let [maxSize, setMaxSize] = useState<String>("1024MB")

  useEffect(() => {
    async function freshStatus(){

        try {
          let a = await getLogSwitchStatus()
          setSwitchStatus(a.data.status===1? true: false)
          setLogSize(a.data.logSize)
          setMaxSize(a.data.maxSize)
        } catch(error) {
          message.error("获取日志状态失败");
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

      <Card>
        <p>日志容量状态(已用容量/总容量)：{logSize}/{maxSize}</p>
      </Card>
    </PageHeaderWrapper>
  );
};

export default TableList;
