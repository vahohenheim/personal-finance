import { Button, Form, Input } from 'antd';
import { FormCompanyComponentProps } from './form.model';
import { FC } from 'react';
import { FormItemSuspenseComponent } from '../../form-item-suspense/form-item-suspense';

export const FormCompanyComponent: FC<FormCompanyComponentProps> = ({
	onFinish,
	form,
	company,
	submitLabel,
	submitting,
}) => {
	return (
		<Form
			form={form}
			initialValues={company}
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item label="Define label" name="label" required={true}>
				<Input size="large" placeholder="typing company label" />
			</Form.Item>
			<Form.Item label="Define logo" name="logo">
				<Input size="large" placeholder="typing logo url" />
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					block
					htmlType="submit"
					size="large"
					loading={submitting}
				>
					{submitLabel}
				</Button>
			</Form.Item>
		</Form>
	);
};
