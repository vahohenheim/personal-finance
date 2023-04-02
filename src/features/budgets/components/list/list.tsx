import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../../gql/gql';
import { gqlClient } from '../../../../utils/graphql-client';
import styles from './list.module.css';
import dayjs from 'dayjs';
import { FC } from 'react';
import type { Budget, Transaction } from '../../../../gql/graphql';
import { Empty } from 'antd';
import ItemBudgetComponent from '../item/item';
import InfosComponent from '../../../../components/infos/infos';
import { formatCurrency } from '../../../../utils/format-currency';

const GET_BUDGETS_QUERY = graphql(`
	query GetMonthBudgets($limit: Int!) {
		budget(order_by: { label: asc }, limit: $limit) {
			budget_months {
				amount
				month {
					start_at
					end_at
				}
			}
			id
			label
		}
	}
`);

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

const ListBudgetsComponent: FC<{ limit: number; month?: string }> = ({
	limit,
	month,
}) => {
	const currentMonth = dayjs().format('MM-YYYY');
	const getBudgets = useQuery({
		queryKey: ['month-budgets'],
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number }
			>(GET_BUDGETS_QUERY, { limit: 100 });
		},
	});

	const getTransactions = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ limit: number }
			>(GET_TRANSACTIONS_QUERY, { limit });
		},
	});

	if (getBudgets.isLoading || getTransactions.isLoading) {
		return <div>Loading...</div>;
	}

	if (getBudgets.isError || getTransactions.isError) {
		console.error(getBudgets.error);
		return <div>Error</div>;
	}

	if (!getBudgets.data || !getTransactions.data) {
		return <div>No data</div>;
	}

	if (
		getBudgets.data.budget.length === 0 ||
		getTransactions.data.transaction.length === 0
	) {
		return (
			<div className={styles.empty}>
				<Empty description={'Any budget'} />
			</div>
		);
	}

	const budgets = getBudgets.data.budget;
	const transactions = getTransactions.data?.transaction;
	const filterTransactions = (budgetId: string) => {
		return (transaction: Transaction) => transaction.budget.id === budgetId;
	};

	const totalTransactions = transactions.reduce((sum, transaction) => {
		sum = (transaction.amount as number) + sum;
		return sum;
	}, 0);
	const totalBudget = budgets.reduce((sum, budget) => {
		sum = (budget.budget_months[0].amount as number) + sum;
		return sum;
	}, 0);
	const rest = totalBudget - totalTransactions;

	return (
		<div className={styles.container}>
			<div className={styles.list}>
				{budgets.map((budget) => (
					<div key={budget.id as string}>
						<ItemBudgetComponent
							budget={budget}
							transactions={(transactions || []).filter(
								filterTransactions(budget.id as string)
							)}
						/>
					</div>
				))}
			</div>
			<InfosComponent
				infos={[
					{
						label: 'total used',
						value: formatCurrency(totalTransactions),
					},
					{
						label: 'total budgets',
						value: formatCurrency(totalBudget),
					},
					{
						label: 'rest',
						value: formatCurrency(rest),
					},
				]}
			/>
		</div>
	);
};

export default ListBudgetsComponent;
