import { FC } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import { FormChestComponentProps } from './form.model';
import dayjs from 'dayjs';
import { ChestType } from '../../../models/chest';

export const FormChestComponent: FC<FormChestComponentProps> = ({
	onFinish,
	form,
	chest,
	submitLabel,
	submitting,
}) => {
	const initialValues = Object.assign({}, chest);

	if (initialValues?.start_at) {
		initialValues.start_at = dayjs(initialValues.start_at);
	}

	if (initialValues?.end_at) {
		initialValues.end_at = dayjs(initialValues.end_at);
	}

	return (
		<Form
			form={form}
			initialValues={initialValues}
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item label="Define type" name="type">
				<Radio.Group size="large">
					<Radio.Button value={ChestType.PROJECT}>
						{ChestType.PROJECT}
					</Radio.Button>
					<Radio.Button value={ChestType.BUCKET}>
						{ChestType.BUCKET}
					</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item label="Define icon" name="icon">
				<Input size="large" placeholder="typing icon" max={1} />
			</Form.Item>
			<Form.Item label="Define label" name="label" required={true}>
				<Input size="large" placeholder="typing chest label" />
			</Form.Item>
			<Form.Item label="Define amount" name="amount" required={true}>
				<InputNumber
					prefix="€"
					size="large"
					placeholder="typing chest amount"
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item label="Start date" name="start_at" required={true}>
				<DatePicker
					size="large"
					placeholder="typing date"
					style={{ width: '100%' }}
				/>
			</Form.Item>
			<Form.Item label="End date" name="end_at" required={true}>
				<DatePicker
					size="large"
					placeholder="typing date"
					style={{ width: '100%' }}
				/>
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
