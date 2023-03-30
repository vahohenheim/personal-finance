import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../gql/gql';
import { gqlClient } from '../../utils/graphql-client';
import { TransationComponent } from '../transaction/transaction';
import styles from './transactions.module.css';
import dayjs from 'dayjs';
import { FC } from 'react';
import type { Transactions } from '../../gql/graphql';

const GET_TRANSACTIONS_QUERY = graphql(`
	query GetTransactions($limit: Int!) {
		transactions(order_by: { created_at: desc }, limit: $limit) {
			amount
			budget_id
			label
			type
			created_at
			updated_at
			id
			user_id
		}
	}
`);

const TransactionsComponent: FC<{ limit: number }> = ({ limit }) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return gqlClient.request<
				{ transactions: Array<Transactions> },
				{ limit: number }
			>(GET_TRANSACTIONS_QUERY, { limit });
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		console.error(error);
		return <div>Error</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	const transactions = data.transactions;

	const aggregateByDay = (
		acc: Record<string, Array<Transactions>>,
		cur: Transactions
	) => {
		const date = dayjs(cur.created_at as string).format('YYYY-MM-DD');
		if (!acc[date]) {
			acc[date] = [cur];
		} else {
			acc[date].push(cur);
		}
		return acc;
	};

	const transactionByDay = transactions.reduce<
		Record<string, Array<Transactions>>
	>(aggregateByDay, {});

	const aggregateByDayByMonth = (
		acc: Record<string, Record<string, Array<Transactions>>>,
		day: string
	) => {
		const date = dayjs(day).format('YYYY-MM');
		if (!acc[date]) {
			acc[date] = {
				[day]: transactionByDay[day],
			};
		} else {
			acc[date] = {
				...acc[date],
				[day]: transactionByDay[day],
			};
		}
		return acc;
	};

	const transactionByDayByMonth = Object.keys(transactionByDay).reduce(
		aggregateByDayByMonth,
		{}
	);

	const currentMonth = dayjs().format('YYYY-MM');

	return (
		<div>
			<div className={styles.list}>
				{(Object.keys(transactionByDayByMonth) || []).map((month) => (
					<div key={month} className={styles.month}>
						<h3>
							{currentMonth === month ? 'this month, ' : ''}
							{dayjs(month).format('MMMM YYYY').toLowerCase()}
						</h3>
						{Object.keys(transactionByDayByMonth[month]).map(
							(day) => (
								<div key={day} className={styles.day}>
									<p>
										{dayjs(day)
											.format('DD dddd, MMMM')
											.toLowerCase()}
									</p>
									{transactionByDayByMonth[month][day].map(
										(transation) => (
											<div key={transation.id as string}>
												<TransationComponent
													transation={transation}
												/>
											</div>
										)
									)}
								</div>
							)
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default TransactionsComponent;
