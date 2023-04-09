import { Empty } from 'antd';
import { FC } from 'react';
import { ListCompaniesComponentProps } from './list.model';
import styles from './list.module.css';
import { ItemCompanyComponent } from '../item/item';
import { ListSkeletonCompaniesComponent } from './list.skeleton';

export const ListCompaniesComponent: FC<ListCompaniesComponentProps> = ({
	companies = [],
	loading = false,
}) => {
	const empty = !companies || companies.length === 0;
	return (
		<div className={styles.list}>
			{loading ? (
				<ListSkeletonCompaniesComponent />
			) : empty ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={'Any companies'}
				/>
			) : (
				companies.map((company) => (
					<div key={company.id as string}>
						<ItemCompanyComponent company={company} />
					</div>
				))
			)}
		</div>
	);
};
