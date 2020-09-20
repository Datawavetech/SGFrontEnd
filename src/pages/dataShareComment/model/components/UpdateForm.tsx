import React, { useState } from 'react';
import { Form, Input, Modal, InputNumber, Select } from 'antd';

import { TokenModel } from '../data.d';
import { Option } from 'antd/lib/mentions';

export interface FormValueType extends Partial<TokenModel> {
  target?: string;
  template?: string;
  modelId?: string;
  modelName?: string;
  modelDesc?: string;
  upCount?: number;
  isRunning?: number;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TokenModel>;
}
const FormItem = Form.Item;
const { TextArea } = Input;

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
    modelId: props.values.modelId,
    modelName: props.values.modelName,
    modelDesc: props.values.modelDesc,
    upCount: props.values.upCount,
    isRunning: props.values.isRunning,
  });

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  }

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
        {values.isRunning === 2 ? <FormItem
          name="isRunning"
          label="是否运行"
          rules={[{ required: true, message: '请输入运行信息！' }]}
        >
          <Select defaultValue={1}>
            <Option value="1">正在运行</Option>
            <Option value="2">未运行</Option>
          </Select>
        </FormItem> : null}

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
      onOk={handleSubmit}
      okText="提交"
      cancelText="取消"
    >
      <Form
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          modelId: formVals.modelId,
          modelName: formVals.modelName,
          modelDesc: formVals.modelDesc,
          upCount: formVals.upCount,
          isRunning: formVals.isRunning === 2 ? "未运行" : "正在运行",
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
