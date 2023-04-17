export const QUERIES = {
	USER: 'user',
	TRANSACTIONS: 'transactions',
	TRANSACTIONS_BY_MONTH: 'transactions-by-month',
	TRANSACTION: (id: string) => `transaction-${id}`,
	COMPANIES: 'companies',
	COMPANY: (id: string) => `company-${id}`,
	BUDGETS: 'budgets',
	MONTH_BUDGETS: 'month-budgets',
	BUDGET: (id: string) => `budget-${id}`,
	CHESTS: 'chests',
	CHEST: (id: string) => `chest-${id}`,
};
