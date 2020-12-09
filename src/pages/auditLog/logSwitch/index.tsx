import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import { changeLogSwitch, getLogSwitchStatus } from './service'
import { message, Card, Button, Divider, Descriptions, InputNumber } from 'antd';
import { useAccess } from 'umi';

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
  let [switchStatus, setSwitchStatus] = useState<number>(1);
  let [logSize, setLogSize] = useState<String>("1MB");
  let [maxSize, setMaxSize] = useState<String>("1024MB")
  let [logSizeByte, setLogSizeByte] = useState<number>(1024);
  let [maxSizeByte, setMaxSizeByte] = useState<number>(1073741824);
  const access = useAccess();
  let [maxSizeSet, setMaxSizeSet] = useState<number>(1024);

  const freshStatus = async () => {
    try {
      let t = await getLogSwitchStatus()
      console.log(t)
      if (t.data.status && t.data.logSize && t.data.maxSize &&
        t.data.logSizeByte != undefined && t.data.maxSizeByte != undefined) {
        setSwitchStatus(t.data.status)
        setLogSize(t.data.logSize)
        setMaxSize(t.data.maxSize)
        setLogSizeByte(t.data.logSizeByte)
        setMaxSizeByte(t.data.maxSizeByte)
        if (t.data.logSizeByte / t.data.maxSizeByte > 0.8) {
          message.error("日志空间容量不足")
        }
      }
      else {
        throw Error()
      }
    } catch (error) {
      message.error("获取日志状态失败");
    }
  }

  useEffect(() => {
    freshStatus()
  }, [switchStatus]);

  const clickOpenLog = async () => {
    try {
      let t = { status: 1 }
      await changeLogSwitch(t)
      await freshStatus()
    } catch (error) {
      message.error("修改日志状态错误")
    }

  }

  const clickCloseLog = async () => {
    try {
      let t = { status: 2 }
      await changeLogSwitch(t)
      await freshStatus()
    } catch (error) {
      message.error("修改日志状态错误")
    }
  }

  const onChangeMaxInputNumber = (value) => {
    console.log(value)
    setMaxSizeSet(value)
  }

  const clickMaxSizeSet = async () => {
    try {
      let t = { maxSize: maxSizeSet }
      if (maxSizeSet * 1024 * 1024 < maxSizeByte) {
        message.error("日志容量设置不可小于原有容量大小")
        throw Error()
      }
      await changeLogSwitch(t)
      await freshStatus()
    } catch (error) {
      message.error("修改日志容量大小错误")
    }
  }

  return (
    <PageHeaderWrapper>
      <Card>
        <p>当前状态：{switchStatus === 1 ? "日志已开启" : "日志已关闭"} </p>
        <Button hidden={!access.checkUri('/auditLog/logSwitch/update')} type="primary" disabled={switchStatus === 1} onClick={clickOpenLog}> 开启日志 </Button>
        <Button hidden={!access.checkUri('/auditLog/logSwitch/update')} type="primary" disabled={!(switchStatus === 1)} onClick={clickCloseLog}> 关闭日志 </Button>
      </Card>

      <Card>
        <p>日志容量状态(已用容量/总容量)：{logSize}/{maxSize} ({`${(logSizeByte / maxSizeByte * 100).toFixed(3)}%`})</p>
        <p hidden={!access.checkUri('/auditLog/logSwitch/update')}>
          设置日志最大容量（500MB～3000MB）：<InputNumber min={500} max={3000} defaultValue={1024} onChange={onChangeMaxInputNumber} /> MB
        <Button type="primary" style={{ marginLeft: 18 }} onClick={clickMaxSizeSet}>设置</Button>
        </p>
      </Card>
    </PageHeaderWrapper>
  );
};

export default TableList;
