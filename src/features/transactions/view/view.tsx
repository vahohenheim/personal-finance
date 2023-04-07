import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { graphql } from '../../../gql';
import { gqlClient } from '../../../utils/graphql-client';
import { useQuery } from '@tanstack/react-query';
import { Transaction } from '../../../gql/graphql';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { ListTransactionsComponent } from '../../../components/transaction/list/list';

const GET_TRANSACTIONS_QUERY = graphql(`
	query GetTransactions($limit: Int!) {
		transaction(order_by: { created_at: desc }, limit: $limit) {
			amount
			budget {
				id
				label
				icon
				budget_type {
					color
				}
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

const ViewTransactionsPage: FC = () => {
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
				<SectionComponent>
					<TitleComponent
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
					</TitleComponent>
					<ListTransactionsComponent
						transactions={getTransactions?.data?.transaction}
						loading={getTransactions?.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default ViewTransactionsPage;
