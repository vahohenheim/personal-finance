import { Empty } from 'antd';
import { FC } from 'react';
import { ListCompaniesComponentProps } from './list.model';
import styles from './list.module.css';
import { ItemCompanyComponent } from '../item/item';

export const ListCompaniesComponent: FC<ListCompaniesComponentProps> = ({
	companies = [],
	loading = false,
}) => {
	if (loading) {
		return <div>Loading...</div>;
	}

	if (companies.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={'Any companies'}
				/>
			</div>
		);
	}

	return (
		<div className={styles.list}>
			{companies.map((company) => (
				<div key={company.id as string}>
					<ItemCompanyComponent company={company} />
				</div>
			))}
		</div>
	);
};
