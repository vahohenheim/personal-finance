import { Transaction } from '../../../gql/graphql';
import dayjs from 'dayjs';

export class ListTransactionAdapter {
	public static groupTransactions(
		transactions: Array<Transaction>
	): Record<string, Record<string, Array<Transaction>>> {
		const transactionByDay = transactions.reduce<
			Record<string, Array<Transaction>>
		>(ListTransactionAdapter.aggregateByDay.bind(this), {});

		return Object.keys(transactionByDay).reduce(
			ListTransactionAdapter.aggregateByDayByMonth(transactionByDay),
			{}
		);
	}

	private static aggregateByDay(
		transactionByDay: Record<string, Array<Transaction>>,
		transaction: Transaction
	) {
		const date = dayjs(transaction.created_at as string).format(
			'YYYY-MM-DD'
		);
		if (!transactionByDay[date]) {
			transactionByDay[date] = [transaction];
		} else {
			transactionByDay[date].push(transaction);
		}
		return transactionByDay;
	}

	private static aggregateByDayByMonth(
		transactionByDay: Record<string, Array<Transaction>>
	) {
		return (
			transactionsByDayByMonth: Record<
				string,
				Record<string, Array<Transaction>>
			>,
			day: string
		) => {
			const date = dayjs(day).format('YYYY-MM');
			if (!transactionsByDayByMonth[date]) {
				transactionsByDayByMonth[date] = {
					[day]: transactionByDay[day],
				};
			} else {
				transactionsByDayByMonth[date] = {
					...transactionsByDayByMonth[date],
					[day]: transactionByDay[day],
				};
			}
			return transactionsByDayByMonth;
		};
	}
}
