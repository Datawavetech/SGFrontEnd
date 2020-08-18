import React from 'react';
import { Form, Modal, Input, DatePicker, Upload, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UploadOutlined } from '@ant-design/icons';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const renderContent = () => {
  return (
    <>
      <FormItem
        name="usages"
        label="数据使用约定"
        rules={[{ required: true, message: '请输入使用约定！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        name="dataTypes"
        label="数据类型列表"
        rules={[{ required: true, message: '请输入数据类型列表！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
        name="expireAt"
        label="数据有效期"
        rules={[{ required: true, }]}
      >
        <DatePicker />
      </FormItem>
      <FormItem
        name="file"
        label="文件"
        rules={[{ required: true, }]}
      >
        <Upload>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </FormItem>
    </>
  );
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible, onCancel } = props;


  return (
    <Modal
      destroyOnClose
      title="数据上链申请"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form form={form}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
