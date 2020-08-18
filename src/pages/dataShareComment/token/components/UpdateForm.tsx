import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, InputNumber } from 'antd';

import { TokenModel } from '../data.d';

export interface FormValueType extends Partial<TokenModel> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TokenModel>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

// const formLayout = {
//   labelCol: { span: 7 },
//   wrapperCol: { span: 13 },
// };

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    assetName: props.values.assetName,
    assetSys: props.values.assetSys,
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
          name="modelName"
          label="模型名称"
          rules={[{ required: true, message: '请输入模型名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="modelDesc"
          label="模型描述"
          rules={[{ required: true, message: '请输入模型描述！' }]}
        >
          <TextArea rows={2} placeholder="请输入" />
        </FormItem>
        <FormItem
          name="upCount"
          label="上升指数"
          rules={[{ required: true, message: '请输入上升指数！' }]}
        >
          <InputNumber min={1} max={10} />
        </FormItem>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="更新模型信息"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Form
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          modelName: formVals.modelName,
          modelDesc: formVals.modelDesc,
          upCount: formVals.upCount,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
