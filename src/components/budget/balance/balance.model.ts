import { Budget, Month } from '../../../gql/graphql';

export type BalanceBudgetComponentProps = {
	budgets: Array<Budget> | undefined;
	currentMonth: Partial<Month> | undefined;
	loading: boolean;
};
