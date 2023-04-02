import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../../gql/gql';
import { gqlClient } from '../../../../utils/graphql-client';
import ItemTransactionComponent from '../item/item';
import styles from './list.module.css';
import dayjs from 'dayjs';
import { FC } from 'react';
import type { Transaction } from '../../../../gql/graphql';
import { Empty } from 'antd';
import type { ListTransactionsComponentProps } from './list.model';

const ListTransactionsComponent: FC<ListTransactionsComponentProps> = ({
	transactions = [],
	loading = false,
}) => {
	if (loading) {
		return <p>Loading...</p>;
	}

	if (!transactions || transactions.length === 0) {
		return (
			<div className={styles.empty}>
				<Empty description={'Any transaction'} />
			</div>
		);
	}

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
		<div className={styles.list}>
			{(Object.keys(transactionByDayByMonth) || []).map((month) => (
				<div key={month} className={styles.month}>
					<h3>
						{currentMonth === month ? 'this month, ' : ''}
						{dayjs(month).format('MMMM YYYY').toLowerCase()}
					</h3>
					{Object.keys(transactionByDayByMonth[month]).map((day) => (
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
					))}
				</div>
			))}
		</div>
	);
};

export default ListTransactionsComponent;
