import type { Budget } from '../../../gql/graphql';

export type ItemBudgetComponentProps = {
	budget: Budget;
};

export type ItemInputBudgetComponentProps = {
	budget: Partial<Budget>;
};
