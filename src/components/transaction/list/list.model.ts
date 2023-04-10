import { Transaction } from '../../../gql/graphql';
import { TransactionType } from '../../../models/transaction';

export type ListTransactionsComponentProps = {
	transactions: Array<Transaction> | undefined;
	transactionType?: TransactionType;
	loading: boolean;
	max?: number;
};
