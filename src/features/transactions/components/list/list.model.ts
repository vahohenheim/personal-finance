import { Transaction } from '../../../../gql/graphql';

export type ListTransactionsComponentProps = {
	transactions: Array<Transaction> | undefined;
	loading: boolean;
};
