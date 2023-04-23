import { Transaction } from '../../../gql/graphql';
import { TransactionType } from '../../../models/transaction';
import dayjs from 'dayjs';

export class ListTransactionsService {
	public static sliceTransactions(
		transactions: Array<Transaction>,
		max?: number
	) {
		if (max) {
			return transactions.slice(0, max);
		}
		return transactions;
	}

	public static filterTransactions(
		transactions: Array<Transaction>,
		transactionType?: TransactionType
	) {
		if (transactionType) {
			const filterTransaction = (transaction: Transaction) =>
				transaction.transaction_type === transactionType;
			return transactions.filter(filterTransaction);
		}
		return transactions;
	}

	public static groupTransactions(
		transactions: Array<Transaction>
	): Record<string, Record<string, Array<Transaction>>> {
		const transactionByDay = transactions.reduce<
			Record<string, Array<Transaction>>
		>(ListTransactionsService.aggregateByDay.bind(this), {});

		return Object.keys(transactionByDay).reduce(
			ListTransactionsService.aggregateByDayByMonth(transactionByDay),
			{}
		);
	}

	private static aggregateByDay(
		transactionByDay: Record<string, Array<Transaction>>,
		transaction: Transaction
	) {
		const date = dayjs(transaction.date as string).format('YYYY-MM-DD');
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
