import styles from './list.module.css';
import { FC } from 'react';
import { Empty } from 'antd';
import type { ListTransactionsComponentProps } from './list.model';
import { ItemTransactionComponent } from '../item/item';
import { ListSkeletonTransactionsComponent } from './list.skeleton';
import { useListTransactions } from './list.hook';
import { DateService } from '../../../services/date';

export const ListTransactionsComponent: FC<ListTransactionsComponentProps> = ({
	transactions = [],
	transactionType,
	loading = false,
	max,
}) => {
	const empty = !transactions || transactions.length === 0;
	const transactionByDayByMonth = useListTransactions(transactions, {
		transactionType,
		max,
	});

	console.log('transactionByDayByMonth', transactionByDayByMonth);
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
							{DateService.getCurrentMonth() === month
								? 'this month, '
								: ''}
							{DateService.formatMonth(month)}
						</h3>
						{Object.keys(transactionByDayByMonth[month]).map(
							(day) => (
								<div key={day} className={styles.day}>
									<p>{DateService.formatDay(day)}</p>
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
