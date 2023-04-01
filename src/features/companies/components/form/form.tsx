import { Button, Form, Input } from 'antd';
import { FormCompanyComponentProps } from './form.model';
import { FC } from 'react';

const FormCompanyComponent: FC<FormCompanyComponentProps> = ({
	onFinish,
	form,
	initialValues,
}) => {
	return (
		<Form
			form={form}
			initialValues={initialValues}
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item label="Define label" name="label">
				<Input size="large" placeholder="typing company label" />
			</Form.Item>
			<Form.Item label="Define logo" name="logo">
				<Input size="large" placeholder="typing logo url" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" block htmlType="submit" size="large">
					add transaction
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormCompanyComponent;
