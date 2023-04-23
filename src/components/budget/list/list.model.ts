import type { Budget } from '../../../gql/graphql';

export type ListBudgetComponentProps = {
	budgets: Array<Budget> | undefined;
	loading: boolean;
	settable?: boolean;
};
