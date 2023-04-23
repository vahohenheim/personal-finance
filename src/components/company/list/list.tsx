import { Empty, Input } from 'antd';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { ListCompaniesComponentProps } from './list.model';
import styles from './list.module.css';
import { ItemCompanyComponent } from '../item/item';
import { ListSkeletonCompaniesComponent } from './list.skeleton';
import { Company } from '../../../gql/graphql';

export const ListCompaniesComponent: FC<ListCompaniesComponentProps> = ({
	companies = [],
	loading = false,
}) => {
	const empty = !companies || companies.length === 0;
	const [initialCompanies, setInitialCompanies] = useState([...companies]);
	const [filteredCompanies, setFilteredCompanies] = useState([...companies]);

	useEffect(() => {
		console.log('useEffectcompanies');
		setInitialCompanies(companies);
		setFilteredCompanies(companies);
	}, [companies]);

	const handleSearch = (query: ChangeEvent<HTMLInputElement>) => {
		if (query.target.value.length > 1) {
			loading = true;
			const filterCompany = (company: Company) =>
				company.label.toLowerCase().includes(query.target.value);
			setFilteredCompanies(() => initialCompanies.filter(filterCompany));
			loading = false;
		} else {
			setFilteredCompanies(initialCompanies);
		}
	};

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
				<>
					<Input.Search
						placeholder="input search company"
						onChange={handleSearch}
						className={styles.search}
						size={'large'}
					/>
					{filteredCompanies.map((company) => (
						<div key={company.id as string}>
							<ItemCompanyComponent company={company} />
						</div>
					))}
				</>
			)}
		</div>
	);
};
