import { Transaction } from '../../../gql/graphql';
import { ListTransactionsOptions } from './list.model';
import { ListTransactionsService } from './list.service';

export const useListTransactions = (
	transactions: Array<Transaction>,
	options: ListTransactionsOptions
): Record<string, Record<string, Array<Transaction>>> => {
	const filtredTransactions = ListTransactionsService.filterTransactions(
		transactions,
		options.transactionType
	);
	const slicedTransactions = ListTransactionsService.sliceTransactions(
		filtredTransactions,
		options.max
	);
	return ListTransactionsService.groupTransactions(slicedTransactions);
};
