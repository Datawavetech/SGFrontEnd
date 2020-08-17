import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { AssetIdentifier } from '../data.d';

export interface FormValueType extends Partial<AssetIdentifier> {
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
  values: Partial<AssetIdentifier>;
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
          name="assetName"
          label="资产名称"
          rules={[{ required: true, message: '请输入资产名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="assetSys"
          label="所有者"
          rules={[{ required: true, message: '请输入资产所属人！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="更新权属标识"
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
          assetName: formVals.assetName,
          assetSys: formVals.assetSys,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
