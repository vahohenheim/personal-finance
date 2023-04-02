import { Budget, Transaction } from '../../../../gql/graphql';

export type ItemBudgetComponentProps = {
	budget: Budget;
	transactions: Array<Transaction>;
};
