import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Transaction } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_TRANSACTIONS_BY_MONTH_QUERY = graphql(`
	query GetTransactionsByMonth(
		$limit: Int!
		$start_at: timestamptz!
		$end_at: timestamptz!
	) {
		transaction(
			order_by: { created_at: desc }
			where: { date: { _gte: $start_at, _lte: $end_at } }
			limit: $limit
		) {
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
			chest {
				icon
				label
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
			chest_id
			date
		}
	}
`);

export const useGetTransactionsByMonth = (
	limit: number,
	start_at: string,
	end_at: string
) => {
	return useQuery({
		queryKey: [QUERIES.TRANSACTIONS_BY_MONTH],
		enabled: !!start_at && !!end_at,
		queryFn: async () => {
			return gqlClient.request<
				{ transaction: Array<Transaction> },
				{ limit: number; start_at: string; end_at: string }
			>(GET_TRANSACTIONS_BY_MONTH_QUERY, { limit, start_at, end_at });
		},
	});
};
