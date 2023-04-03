import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SectionComponent from '../../components/section/section';
import TitleComponent from '../../components/title/title';
import { graphql } from '../../gql/gql';
import type { Company } from '../../gql/graphql';
import { gqlClient } from '../../utils/graphql-client';
import ListCompaniesComponent from './components/list/list';

const GET_COMPANIES_QUERY = graphql(`
	query GetCompanies($limit: Int!) {
		company(order_by: { created_at: desc }, limit: $limit) {
			id
			label
			logo
		}
	}
`);

const CompaniesPage = () => {
	const getCompanies = useQuery({
		queryKey: ['companies'],
		queryFn: async () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ limit: number }
			>(GET_COMPANIES_QUERY, { limit: 100 });
		},
	});

	return (
		<>
			<Helmet>
				<title>companies | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent
						heading={'h2'}
						action={
							<Link to="/companies/add">
								<Button type="primary" block={true}>
									Add company
								</Button>
							</Link>
						}
					>
						Companies
					</TitleComponent>
					<ListCompaniesComponent
						companies={getCompanies?.data?.company}
						loading={getCompanies.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default CompaniesPage;
