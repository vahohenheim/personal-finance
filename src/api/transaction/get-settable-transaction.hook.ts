import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Transaction } from '../../gql/graphql';

const GET_SETTABLE_TRANSACTION_QUERY = graphql(`
	query GetSettableTransaction($id: uuid!) {
		transaction(where: { id: { _eq: $id } }) {
			amount
			budget_id
			company_id
			label
			date
			transaction_type
			id
		}
	}
`);

export const useGetSettableTransaction = (id: string) => {
	return useQuery({
		queryKey: [`transation-${id || ''}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ id: string }
			>(GET_SETTABLE_TRANSACTION_QUERY, {
				id: id || '',
			});
		},
	});
};
