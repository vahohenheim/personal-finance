import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Transaction } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_TRANSACTIONS_QUERY = graphql(`
	query GetTransactions($limit: Int!) {
		transaction(order_by: { created_at: desc }, limit: $limit) {
			amount
			budget_id
			company_id
			budget {
				id
				label
				icon
				budget_type {
					color
				}
				budget_months {
					amount
					month {
						start_at
						end_at
					}
				}
			}
			company {
				label
				logo
			}
			label
			transaction_type
			created_at
			updated_at
			id
			user_id
			date
		}
	}
`);

export const useGetTransactions = (limit: number) => {
	return useQuery({
		queryKey: [QUERIES.TRANSACTIONS],
		queryFn: async () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ limit: number }
			>(GET_TRANSACTIONS_QUERY, { limit });
		},
	});
};
