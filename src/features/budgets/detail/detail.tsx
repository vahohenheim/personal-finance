import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import { Helmet } from 'react-helmet';
import Section from '../../../components/section/section';
import styles from './detail.module.css';
import LinkComponent from '../../../components/link/link';
import type { Budget, Transaction } from '../../../gql/graphql';
import { formatCurrency } from '../../../utils/format-currency';
import ListTransactionsComponent from '../../transactions/components/list/list';
import { Button } from 'antd';
import BudgetIconComponent from '../../../components/budget-icon/budget-icon';
import DetailCoverComponent from '../../../components/detail-cover/detail-cover';
import classNames from 'classnames';

const GET_BUDGET_QUERY = graphql(`
	query GetBudget($id: uuid!) {
		budget(where: { id: { _eq: $id } }) {
			id
			label
			icon
			budget_type {
				color
			}
			budget_months {
				amount
			}
			transactions(order_by: { date: desc }) {
				amount
				budget {
					id
					label
					icon
					budget_type {
						color
					}
					budget_months {
						month_id
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
	}
`);

/*
{
  transaction(where: {date: {_gte: "2023-04-01T00:00:00.000000+00:00", _lte: "2023-05-01T00:00:00.000000+00:00"}}) {
    date
  }
}
*/

const DetailBudgetPage = () => {
	const { id } = useParams();

	const getBudget = useQuery({
		queryKey: [`budget-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<{ budget: Array<Budget> }, { id: string }>(
				GET_BUDGET_QUERY,
				{
					id: id || '',
				}
			);
		},
	});

	const budget = getBudget?.data?.budget[0];

	if (getBudget.isLoading) {
		return <div>Loading...</div>;
	}

	if (getBudget.isError) {
		console.error(getBudget.error);
		return <div>Error</div>;
	}

	if (!getBudget.data) {
		return <div>No data</div>;
	}

	const aggregateAmountTransactions = (
		sum: number,
		transaction: Transaction
	) => {
		sum = (transaction.amount as number) + sum;
		return sum;
	};

	const amountTransactions = budget?.transactions.reduce(
		aggregateAmountTransactions,
		0
	);

	const percent =
		((amountTransactions || 0) * 100) / budget?.budget_months[0]?.amount;

	return (
		<>
			<Helmet>
				<title>transaction {budget?.label || ''} - finance</title>
			</Helmet>

			<div className="container center-block">
				<DetailCoverComponent
					className={classNames({ [styles.exceed]: percent > 100 })}
					icon={
						<BudgetIconComponent
							icon={budget?.icon || ''}
							color={budget?.budget_type?.color || ''}
						/>
					}
					title={budget?.label || ''}
					amount={
						<>
							<span>{formatCurrency(amountTransactions)}</span>
							<span className={styles.budgetAmount}>
								/
								{formatCurrency(
									budget?.budget_months[0]?.amount
								)}
							</span>
						</>
					}
				/>
				<Section>
					<ListTransactionsComponent
						transactions={budget?.transactions}
						loading={getBudget.isLoading}
					/>
				</Section>
				<Section className={styles.actions}>
					<LinkComponent to={`/budgets/${budget?.id as string}/edit`}>
						<Button type="link" block={true}>
							update
						</Button>
					</LinkComponent>
					<Button type="link" block={true} danger>
						delete
					</Button>
				</Section>
			</div>
		</>
	);
};

export default DetailBudgetPage;
