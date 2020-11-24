import { message} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { FooterToolbar, PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {updateTokenStatus} from "./service"
import { history } from 'umi';
import { useModel } from 'umi';



const TableList: React.FC<{}> = () => {
  const { refresh } = useModel('@@initialState')

  useEffect(()=>{
    (async ()=>{
      let currentUserStr = localStorage.getItem('tdsp');
      let currentUser : API.CurrentUser = JSON.parse(currentUserStr);
      let token = currentUser? currentUser.token : null
      let role = currentUser? currentUser.role: null
      //alert(`ISC BEFORE Update:${token}/${role}`)
      console.log(`ISC BEFORE Update:${token}/${role}`)
      let t = await updateTokenStatus(role)

      currentUserStr = localStorage.getItem('tdsp');
      currentUser = JSON.parse(currentUserStr);
      token = currentUser? currentUser.token : null
      role = currentUser? currentUser.role: null

      //alert(`ISC AFTER Update:${token}/${role}`)
      console.log(`ISC AFTER Update:${token}/${role}`)
      await refresh()
      if (role === 3)
        history.push("/auditLog/runningLog")
      else
        history.push("/dataConfirm/assetIdentifier")
    })();
    //console.log(blockHeight)
  },[])

  return (
    <PageHeaderWrapper>
      <div>
        等待登陆中......
      </div>
    </PageHeaderWrapper>
  );
};

export default TableList;
