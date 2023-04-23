import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { Transaction_Insert_Input } from '../../gql/graphql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import { QUERIES } from '../constants';

const INSERT_TRANSACTION_MUTATION = graphql(`
	mutation InsertTransaction($transaction: transaction_insert_input!) {
		insert_transaction(objects: [$transaction]) {
			affected_rows
			returning {
				id
				label
				amount
				budget_id
				chest_id
				company_id
				user_id
				transaction_type
				date
				created_at
				updated_at
			}
		}
	}
`);

export const useInsertTransaction = (userId: string) => {
	return useMutation({
		mutationFn: (transaction: Transaction_Insert_Input) => {
			return gqlClient.request(INSERT_TRANSACTION_MUTATION, {
				transaction: {
					amount: transaction.amount,
					budget_id: transaction.budget_id || null,
					chest_id: transaction.chest_id || null,
					label: transaction.label,
					transaction_type: transaction.transaction_type,
					company_id: transaction.company_id,
					user_id: userId,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				QUERIES.TRANSACTIONS,
				QUERIES.TRANSACTIONS_BY_MONTH,
				QUERIES.BUDGETS,
				QUERIES.BUDGET_ITEMS,
				QUERIES.MONTH_BUDGETS,
			]);
		},
	});
};
