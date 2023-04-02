import { useQuery } from '@tanstack/react-query';
import { Empty } from 'antd';
import { graphql } from '../../../../gql/gql';
import { Company } from '../../../../gql/graphql';
import { gqlClient } from '../../../../utils/graphql-client';
import ItemCompanyComponent from '../item/item';
import styles from './list.module.css';

const GET_COMPANIES_QUERY = graphql(`
	query GetCompanies($limit: Int!) {
		company(order_by: { created_at: desc }, limit: $limit) {
			id
			label
			logo
		}
	}
`);

const ListCompaniesComponent = () => {
	const getCompanies = useQuery({
		queryKey: ['companies'],
		queryFn: async () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ limit: number }
			>(GET_COMPANIES_QUERY, { limit: 100 });
		},
	});

	if (getCompanies.isLoading) {
		return <div>Loading...</div>;
	}

	if (getCompanies.isError) {
		console.error(getCompanies.error);
		return <div>Error</div>;
	}

	if (!getCompanies.data) {
		return <div>No data</div>;
	}

	if (getCompanies.data.company.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty description={'Any companies'} />
			</div>
		);
	}

	const companies = getCompanies.data.company;

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
