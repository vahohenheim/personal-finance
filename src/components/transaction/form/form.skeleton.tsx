import { FC } from 'react';
import { Form, Skeleton } from 'antd';

export const FormSkeletonTransactionComponent: FC = () => {
	// TODO: find way to mutualize label
	return (
		<Form layout="vertical">
			<Form.Item
				label="Define transaction"
				name="transaction_type"
				required={true}
			>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item label="Select budget" name="budget_id" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item label="Select company" name="company_id" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item label="Define label" name="label" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item label="Amount" name="amount" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item label="Date" name="date" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item>
				<Skeleton.Button active size="large" block={true} />
			</Form.Item>
		</Form>
	);
};
