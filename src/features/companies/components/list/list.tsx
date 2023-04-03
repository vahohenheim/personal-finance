import { Empty } from 'antd';
import { FC } from 'react';
import ItemCompanyComponent from '../item/item';
import { ListCompaniesComponentProps } from './list.model';
import styles from './list.module.css';

const ListCompaniesComponent: FC<ListCompaniesComponentProps> = ({
	companies = [],
	loading = false,
}) => {
	if (loading) {
		return <div>Loading...</div>;
	}

	if (companies.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty description={'Any companies'} />
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

export default ListCompaniesComponent;
