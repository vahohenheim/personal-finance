import { Button, Form, InputNumber } from 'antd';
import { FormBudgetMonthComponentProps } from './form.model';
import { FC } from 'react';

export const FormBudgetMonthComponent: FC<FormBudgetMonthComponentProps> = ({
	onFinish,
	form,
	budgetMonth,
	submitLabel,
	submitting,
}) => {
	return (
		<Form
			form={form}
			initialValues={budgetMonth}
			layout="vertical"
			onFinish={onFinish}
			disabled={submitting}
		>
			<Form.Item label="Amount" name="amount" required={true}>
				<InputNumber
					prefix="€"
					size="large"
					placeholder="typing transaction amount"
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
