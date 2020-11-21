import { message} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { FooterToolbar, PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {updateTokenStatus} from "./service"
import { history } from 'umi';




const TableList: React.FC<{}> = () => {

  useEffect(()=>{
    (async ()=>{
      await updateTokenStatus()
      history.push("/dataConfirm/assetIdentifier")
    })();

    //console.log(blockHeight)
  },[])

  return (
    <PageHeaderWrapper>
      <div>
      </div>

    </PageHeaderWrapper>
  );
};

export default TableList;
