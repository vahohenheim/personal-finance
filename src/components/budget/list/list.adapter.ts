import { Budget } from '../../../gql/graphql';

export class ListBudgetAdapter {
	public static getBudgetTotal(budgets: Array<Budget>) {
		const transactionsAmount = budgets?.map((budget) => {
			return (budget.transactions || []).reduce((sum, transaction) => {
				sum = (transaction.amount as number) + sum;
				return sum;
			}, 0);
		});

		const totalTransactions = transactionsAmount.reduce((sum, amount) => {
			sum = amount + sum;
			return sum;
		}, 0);

		const totalBudget = budgets?.reduce((sum, budget) => {
			sum = (budget.budget_months[0].amount as number) + sum;
			return sum;
		}, 0);

		return {
			totalBudget,
			totalTransactions,
			rest: totalBudget - totalTransactions,
		};
	}
}
