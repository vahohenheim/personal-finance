import { FC } from 'react';
import { ItemSkeletonCompanyComponent } from '../item/item.skeleton';
import { Skeleton } from 'antd';

export const ListSkeletonCompaniesComponent: FC = () => {
	return (
		<>
			<div>
				<Skeleton.Input active size="large" block={true} />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
			<div>
				<ItemSkeletonCompanyComponent />
			</div>
		</>
	);
};
