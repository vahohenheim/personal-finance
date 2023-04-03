import type { Budget } from '../../../../gql/graphql';

export type ListBudgetsComponentProps = {
	budgets: Array<Budget> | undefined;
	loading: boolean;
};
