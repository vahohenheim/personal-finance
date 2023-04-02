import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import ListTransactionsComponent from './components/list/list';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { useQuery } from '@tanstack/react-query';
import { Transaction } from '../../gql/graphql';

const GET_TRANSACTIONS_QUERY = graphql(`
	query GetTransactions($limit: Int!) {
		transaction(order_by: { created_at: desc }, limit: $limit) {
			amount
			budget {
				id
				label
				budget_months {
					amount
					month {
						start_at
						end_at
					}
				}
			}
			company {
				label
				logo
			}
			label
			transaction_type
			created_at
			updated_at
			id
			user_id
		}
	}
`);

const TransactionsPage: FC = () => {
	const getTransactions = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ limit: number }
			>(GET_TRANSACTIONS_QUERY, { limit: 100 });
		},
	});

	return (
		<>
			<Helmet>
				<title>transactions | finance</title>
			</Helmet>
			<div className="container center-block">
				<Section>
					<Title
						heading={'h2'}
						action={
							<Link to="/transactions/add">
								<Button type="primary" block={true}>
									Add transaction
								</Button>
							</Link>
						}
					>
						Transactions
					</Title>
					<ListTransactionsComponent
						transactions={getTransactions?.data?.transaction}
						loading={getTransactions?.isLoading}
					/>
				</Section>
			</div>
		</>
	);
};

export default TransactionsPage;
