import { FC } from 'react';
import { ItemSkeletonCompanyComponent } from '../item/item.skeleton';

export const ListSkeletonCompaniesComponent: FC = () => {
	return (
		<>
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
