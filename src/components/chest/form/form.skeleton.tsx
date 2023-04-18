import { Form, Skeleton } from 'antd';
import { FC } from 'react';

export const FormSkeletonChestComponent: FC = () => {
	return (
		<Form layout="vertical">
			<Form.Item label="Define label" name="label" required={true}>
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item label="Define logo" name="logo">
				<Skeleton.Input active size="large" block={true} />
			</Form.Item>
			<Form.Item>
				<Skeleton.Button active size="large" block={true} />
			</Form.Item>
		</Form>
	);
};
