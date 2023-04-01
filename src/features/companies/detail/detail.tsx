import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import type { Company } from '../../../gql/graphql';
import TitleComponent from '../../../components/title/title';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import { Button } from 'antd';
import ItemTransactionComponent from '../../transactions/components/item/item';
import styles from './detail.module.css';

const GET_COMPANY_QUERY = graphql(`
	query GetCompany($id: uuid!) {
		company(where: { id: { _eq: $id } }) {
			id
			label
			logo
			transactions {
				amount
				company {
					label
					logo
				}
				budget {
					label
				}
				label
				transaction_type
				created_at
				updated_at
				id
				user_id
			}
		}
	}
`);

const DetailCompanyPage = () => {
	const { id } = useParams();

	const getCompany = useQuery({
		queryKey: [`company-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ id: string }
			>(GET_COMPANY_QUERY, {
				id: id || '',
			});
		},
	});

	const company = getCompany?.data?.company[0];

	if (getCompany.isLoading) {
		return <div>Loading...</div>;
	}

	if (getCompany.isError) {
		console.error(getCompany.error);
		return <div>Error</div>;
	}

	if (!getCompany.data) {
		return <div>No data</div>;
	}

	return (
		<>
			<Helmet>
				<title>transaction {company?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<Section>
					<TitleComponent heading="h2">
						{company?.label}
					</TitleComponent>
					<TitleComponent heading="h3">Transactions</TitleComponent>
					<div className={styles.transactions}>
						{company?.transactions.map((transaction) => (
							<div key={transaction.id as string}>
								<ItemTransactionComponent
									transaction={transaction}
								/>
							</div>
						))}
					</div>
					<Button type="link" block={true} size="large">
						update
					</Button>
					<Button type="link" block={true} danger size="large">
						delete
					</Button>
				</Section>
			</div>
		</>
	);
};

export default DetailCompanyPage;
