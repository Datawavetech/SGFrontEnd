import React, { useState } from 'react';
import { Form, Input, Modal, } from 'antd';

import { DataType } from '../data';

export interface FormValueType extends Partial<DataType> {
  target?: string;
  template?: string;
  type?: string;
  typeId?: string;
  typeName?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<DataType>;
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
    typeId: props.values.typeId,
    typeName: props.values.typeName,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
  } = props;

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="typeName"
          label="使用类型"
          rules={[{ required: true, message: '请输入使用类型！' }, { max: 20, message: "输入长度超出范围0-20" }]}
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
      title="更改使用类型"
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
          typeName: formVals.typeName,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
