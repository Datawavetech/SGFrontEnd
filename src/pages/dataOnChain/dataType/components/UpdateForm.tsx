import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { DataUsage } from '../data.d';

export interface FormValueType extends Partial<DataUsage> {
  target?: string;
  template?: string;
  type?: string;
  usageId?: string;
  usage?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<DataUsage>;
}

const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    usageId: props.values.usageId,
    usage: props.values.usage,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="usage"
          label="使用约定"
          rules={[{ required: true, message: '请输入使用约定！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  }

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="更改使用约定"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
      onOk={handleSubmit}
      okText="提交"
      cancelText="取消"
    >
      <Form
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          usage: formVals.usage,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
