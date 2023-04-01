import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../../gql/gql';
import { gqlClient } from '../../../../utils/graphql-client';
import ItemTransactionComponent from '../item/item';
import styles from './list.module.css';
import dayjs from 'dayjs';
import { FC } from 'react';
import type { Transaction } from '../../../../gql/graphql';
import { Empty } from 'antd';

const GET_TRANSACTIONS_QUERY = graphql(`
	query GetTransactions($limit: Int!) {
		transaction(order_by: { created_at: desc }, limit: $limit) {
			amount
			budget {
				label
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

const ListTransactionsComponent: FC<{ limit: number; company_id?: string }> = ({
	limit,
	company_id,
}) => {
	const getTransactions = useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ limit: number; company_id?: string }
			>(GET_TRANSACTIONS_QUERY, { limit, company_id });
		},
	});

	if (getTransactions.isLoading) {
		return <div>Loading...</div>;
	}

	if (getTransactions.isError) {
		console.error(getTransactions.error);
		return <div>Error</div>;
	}

	if (!getTransactions.data) {
		return <div>No data</div>;
	}

	if (getTransactions.data.transaction.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty description={'Any transaction'} />
			</div>
		);
	}

	const transactions = getTransactions.data.transaction;

	const aggregateByDay = (
		acc: Record<string, Array<Transaction>>,
		cur: Transaction
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
		Record<string, Array<Transaction>>
	>(aggregateByDay, {});

	const aggregateByDayByMonth = (
		acc: Record<string, Record<string, Array<Transaction>>>,
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
										(transaction) => (
											<div key={transaction.id as string}>
												<ItemTransactionComponent
													transaction={transaction}
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

export default ListTransactionsComponent;
