import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Transaction } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_TRANSACTION_QUERY = graphql(`
	query GetTransaction($id: uuid!) {
		transaction(where: { id: { _eq: $id } }) {
			amount
			company {
				id
				label
				logo
			}
			chest {
				icon
				label
			}
			budget {
				id
				label
				icon
				budget_type {
					color
				}
			}
			label
			transaction_type
			created_at
			updated_at
			id
			user_id
			budget_id
			chest_id
			company_id
			date
		}
	}
`);

export const useGetTransaction = (id: string) => {
	return useQuery({
		queryKey: [QUERIES.TRANSACTION(id)],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ id: string }
			>(GET_TRANSACTION_QUERY, {
				id: id || '',
			});
		},
	});
};
