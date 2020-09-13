import React, { useState } from 'react';
import { Form, Input, Modal } from 'antd';

import { AssetIdentifier } from '../data.d';

export interface FormValueType extends Partial<AssetIdentifier> {
  target?: string;
  template?: string;
  type?: string;
  dataHash?: string;
  assetName?: string;
  assetSys?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<AssetIdentifier>;
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
}


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    dataHash: props.values.dataHash,
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

  const handleSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  }

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
      onOk={handleSubmit}
      okText="提交"
      onCancel={() => handleUpdateModalVisible()}
      cancelText="取消"
    >
      <Form
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          dataHash: formVals.dataHash,
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
