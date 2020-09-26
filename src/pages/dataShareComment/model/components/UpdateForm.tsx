import React, { useState } from 'react';
import { Form, Input, Modal, InputNumber, Select } from 'antd';

import { TokenModel } from '../data.d';
import { Option } from 'antd/lib/mentions';

export interface FormValueType extends Partial<TokenModel> {
  modelId?: string;
  modelName?: string;
  modelDesc?: string;
  upCount?: number;
  isRunning?: string;
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
          rules={[{ required: true, message: "模型名称为必填项" }, { max: 20, message: "输入长度超出范围0-20" }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="modelDesc"
          label="模型描述"
          rules={[{ required: true, message: '请输入模型描述！' }, { max: 80, message: "输入长度超出范围0-80" }]}
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
        {values.isRunning === '2' ? <FormItem
          name="isRunning"
          label="是否运行"
          rules={[{ required: true, message: '请输入运行信息！' }]}
        >
          <Select>
            <Select.Option value='1'>正在运行</Select.Option>
            <Select.Option value='2'>未运行</Select.Option>
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
          modelId: formVals.modelId,
          modelName: formVals.modelName,
          modelDesc: formVals.modelDesc,
          upCount: formVals.upCount,
          isRunning: formVals.isRunning,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
