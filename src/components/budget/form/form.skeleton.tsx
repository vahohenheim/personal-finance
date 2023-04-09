import { Form, Skeleton } from 'antd';
import { FC } from 'react';

export const FormSkeletonBudgetMonthComponent: FC = () => {
	return (
		<Form layout="vertical">
			<Form.Item label="Amount" name="amount" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item>
				<Skeleton.Button active size="large" block={true} />
			</Form.Item>
		</Form>
	);
};
