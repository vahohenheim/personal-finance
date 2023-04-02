import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Section from '../../components/section/section';
import { Button } from 'antd';
import Title from '../../components/title/title';
import ListTransactionsComponent from '../transactions/components/list/list';
import { graphql } from '../../gql/gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Transaction } from '../../gql/graphql';

const GET_TRANSACTIONS_DASHOBARD_QUERY = graphql(`
	query GetTransactionsDashboard($limit: Int!) {
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

const DashboardPage: FC = () => {
	const transactionsLimit = 4;

	const getTransactions = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ limit: number }
			>(GET_TRANSACTIONS_DASHOBARD_QUERY, { limit: transactionsLimit });
		},
	});

	if (!getTransactions?.data?.transaction || getTransactions.isLoading) {
		return <div>Loading...</div>;
	}

	if (getTransactions.isError) {
		console.error(getTransactions.error);
		return <div>Error</div>;
	}

	return (
		<>
			<Helmet>
				<title>dashboard | finance</title>
			</Helmet>
			<div className="container center-block">
				<Section>
					<Title
						heading={'h2'}
						action={
							<Link to="/transactions">
								<Button>See all</Button>
							</Link>
						}
					>
						Last transactions
					</Title>
					<ListTransactionsComponent
						transactions={getTransactions?.data?.transaction.slice(
							0,
							transactionsLimit
						)}
						loading={getTransactions?.isLoading}
					/>
					<Link to="/transactions/add">
						<Button type="primary" block={true} size="large">
							Add transaction
						</Button>
					</Link>
				</Section>
			</div>
		</>
	);
};

export default DashboardPage;
