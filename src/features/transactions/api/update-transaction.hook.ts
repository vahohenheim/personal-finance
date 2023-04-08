import { graphql } from '../../../gql';
import { useMutation } from '@tanstack/react-query';
import { Transaction } from '../../../gql/graphql';
import { gqlClient } from '../../../utils/graphql-client';
import { queryClient } from '../../../utils/react-query-client';

const UPDATE_TRANSACTION_MUTATION = graphql(`
	mutation UpdateTransaction(
		$id: uuid!
		$label: String!
		$amount: float8!
		$budget_id: uuid!
		$company_id: uuid!
		$transaction_type: String!
		$date: timestamptz!
	) {
		update_transaction_by_pk(
			pk_columns: { id: $id }
			_set: {
				label: $label
				amount: $amount
				budget_id: $budget_id
				company_id: $company_id
				transaction_type: $transaction_type
				date: $date
			}
		) {
			id
			label
			amount
			budget_id
			company_id
			transaction_type
			date
		}
	}
`);

export const useUpdateTransaction = (id: string) => {
	return useMutation({
		mutationFn: (updatedTransaction: Partial<Transaction>) => {
			return gqlClient.request<Partial<Transaction>>(
				UPDATE_TRANSACTION_MUTATION,
				updatedTransaction
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				'transactions',
				`transation-${id || ''}`,
			]);
		},
	});
};
