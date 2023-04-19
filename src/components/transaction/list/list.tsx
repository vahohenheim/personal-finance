import styles from './list.module.css';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Empty } from 'antd';
import type { ListTransactionsComponentProps } from './list.model';
import { ItemTransactionComponent } from '../item/item';
import { ListSkeletonTransactionsComponent } from './list.skeleton';
import { ListTransactionAdapter } from './list.adapter';

export const ListTransactionsComponent: FC<ListTransactionsComponentProps> = ({
	transactions = [],
	transactionType,
	loading = false,
	max,
}) => {
	const empty = !transactions || transactions.length === 0;
	const filtredTransactions = ListTransactionAdapter.filterTransactions(
		transactions,
		transactionType
	);
	const slicedTransactions = ListTransactionAdapter.sliceTransactions(
		filtredTransactions,
		max
	);
	const transactionByDayByMonth =
		ListTransactionAdapter.groupTransactions(slicedTransactions);
	const currentMonth = dayjs().format('YYYY-MM');

	const formatMonth = (month: string) =>
		dayjs(month).format('MMMM YYYY').toLowerCase();

	const formatDay = (day: string) =>
		dayjs(day).format('DD dddd, MMMM').toLowerCase();
	return (
		<div className={styles.list}>
			{loading ? (
				<ListSkeletonTransactionsComponent />
			) : empty ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={'Any transaction'}
				/>
			) : (
				(Object.keys(transactionByDayByMonth) || []).map((month) => (
					<div key={month} className={styles.month}>
						<h3>
							{currentMonth === month ? 'this month, ' : ''}
							{formatMonth(month)}
						</h3>
						{Object.keys(transactionByDayByMonth[month]).map(
							(day) => (
								<div key={day} className={styles.day}>
									<p>{formatDay(day)}</p>
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
				))
			)}
		</div>
	);
};
