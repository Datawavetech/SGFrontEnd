import React, { useEffect, useState } from 'react';
import { Form, Modal, DatePicker, Upload, Button, Select, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import FormItem from 'antd/lib/form/FormItem';
import { UploadOutlined } from '@ant-design/icons';
import { listDataTypes, listUsages } from '../service';
import { OnChainRequestForm } from '../data';
import { Moment } from 'moment';
import { RcFile } from 'antd/lib/upload';


const { Option } = Select;

interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: OnChainRequestForm) => void;
  onSubmit: (values: OnChainRequestForm) => void;
  createModalVisible: boolean;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<OnChainRequestForm>({});

  const [form] = Form.useForm();

  const getDataTypes = async () => {
    try {
      const resp = await listDataTypes();
      if (resp.status !== 200) {
        throw message.error('获取数据可用类型失败!');
      }
      const types = [];
      for (let i = 0; i < resp.data.length; i += 1) {
        types.push(<Option key={resp.data[i].typeName} value={resp.data[i].typeName}>{resp.data[i].typeName}</Option>);
      }
      return types;
    } catch (error) {
      return [];
    }
  }

  const getDataUsages = async () => {
    try {
      const resp = await listUsages();
      if (resp.status !== 200) {
        throw message.error('获取数据可用类型失败!');
      }
      const usages = [];
      for (let i = 0; i < resp.data.length; i += 1) {
        usages.push(<Option key={resp.data[i].usage} value={resp.data[i].usage}>{resp.data[i].usage}</Option>);
      }
      return usages;
    } catch (error) {
      return [];
    }
  }

  const [usageList, setUsageList] = useState<JSX.Element[]>([]);
  const [dataTypeList, setDataTypes] = useState<JSX.Element[]>([]);
  useEffect(() => {
    (
      async () => {
        const usages = await getDataUsages();
        setUsageList(usages);
        const types = await getDataTypes();
        setDataTypes(types);
      }
    )()

  }, []);


  const {
    onSubmit: handleAdd,
    onCancel: handleCreateModalVisible,
    createModalVisible,
  } = props;


  const [fileList, setFileList] = useState<RcFile[]>([]);

  const uploadProps = {
    beforeUpload: (file: RcFile) => {
      return new Promise((resolve, reject) => {
        const isDocOrPdfOrExcel = file.type === 'application/doc' || file.type === 'application/docx' || file.type === 'application/xls' || file.type === 'application/xlsx' || file.type === 'application/pdf';
        if (!isDocOrPdfOrExcel) {
          message.error('你只能上传Word/Pdf/Excel相关类型的文档!');
          return reject(false)
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('文件大小必须小于5MB!');
          return reject(false)
        }
        if (fileList.length === 1) {
          message.error('只能上传一个文件！');
          return reject(false)
        }
        return resolve(true);
      })
    },
    multiple: false,
    onRemove: (file: RcFile) => {
      const newFileList = fileList.filter((existFile: RcFile) => existFile.name !== file.name);
      setFileList(newFileList);
    },
    onChange: (info: { file: RcFile, fileList: RcFile[] }) => {
      let newFileList = [...info.fileList];
      setFileList(newFileList);
    },
    fileList: fileList,
  }

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleAdd({ ...formVals, ...fieldsValue });
  }

  const disabledEndDate = (value: Moment) => {//打开结束时间面板调用的函数
    return value.valueOf() <= new Date().getTime();
  }

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="usages"
          label="数据使用约定"
          rules={[{ required: true, message: '请输入使用约定！' }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择数据使用约定"
            style={{ width: '100%' }}
          >
            {usageList}
          </Select>
        </FormItem>
        <FormItem
          name="dataTypes"
          label="数据类型列表"
          rules={[{ required: true, message: '请输入数据类型列表！' }]}
        >
          <Select
            mode="multiple"
            placeholder="请选择数据使用类型"
            style={{ width: '100%' }}
          >
            {dataTypeList}
          </Select>
        </FormItem>
        <FormItem
          name="expireAt"
          label="数据有效期"
          rules={[{ required: true, message: '请填写数据有效期' }]}
        >
          <DatePicker locale={locale} disabledDate={disabledEndDate} style={{ width: 300 }} placeholder='请选择数据有效截止日期' />
        </FormItem>
        <FormItem
          name="file"
          label="文件"
          rules={[{ required: true, message: '请上传需要上链的文件' }]}
        >
          <Upload {...uploadProps}>
            <Button>
              <UploadOutlined /> 文件上传
            </Button>
          </Upload>
        </FormItem>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="数据上链申请"
      visible={createModalVisible}
      onCancel={() => handleCreateModalVisible()}
      onOk={() => handleSubmit()}
      okText='提交上链申请'
      cancelText='取消'
    >
      <Form
        form={form}
        initialValues={{}}
      >
        {renderContent()}
      </Form>
    </Modal >
  );
};

export default CreateForm;
