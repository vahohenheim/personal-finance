import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import { Budget_Month } from '../../gql/graphql';
import { QUERIES } from '../constants';

const UPDATE_BUDGET_MONTH_MUTATION = graphql(`
	mutation UpdateBudgetMonth(
		$budget_id: uuid!
		$month_id: uuid!
		$amount: float8!
	) {
		update_budget_month_by_pk(
			pk_columns: { budget_id: $budget_id, month_id: $month_id }
			_set: { amount: $amount }
		) {
			amount
		}
	}
`);

export const useUpdateBudgetMonth = (id: string) => {
	return useMutation({
		mutationFn: (updatableBudgetMonth: Partial<Budget_Month>) => {
			return gqlClient.request<Partial<Budget_Month>>(
				UPDATE_BUDGET_MONTH_MUTATION,
				updatableBudgetMonth
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				QUERIES.BUDGETS,
				QUERIES.BUDGET(id),
			]);
		},
	});
};
