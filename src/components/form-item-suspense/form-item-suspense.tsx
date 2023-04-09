import { FC, ReactNode } from 'react';
import { Skeleton } from 'antd';

export const FormItemSuspenseComponent: FC<{
	children: ReactNode;
	loading: boolean;
}> = ({ children, loading }) => {
	return loading ? (
		<Skeleton.Input active size="large" block={true} />
	) : (
		<>{children}</>
	);
};
