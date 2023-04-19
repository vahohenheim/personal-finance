import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import { QUERIES } from '../constants';

const DELETE_TRANSACTION_MUTATION = graphql(`
	mutation DeleteTransaction($id: uuid!) {
		delete_transaction(where: { id: { _eq: $id } }) {
			affected_rows
		}
	}
`);

export const useDeleteTransactions = (id: string) => {
	return useMutation({
		mutationFn: (deletedTransaction: string) => {
			return gqlClient.request<{ id: string }>(
				DELETE_TRANSACTION_MUTATION,
				{ id: deletedTransaction }
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				QUERIES.TRANSACTIONS,
				QUERIES.TRANSACTIONS_BY_MONTH,
				QUERIES.TRANSACTION(id),
			]);
		},
	});
};
