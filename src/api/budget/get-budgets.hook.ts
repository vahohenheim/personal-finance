import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Budget } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_BUDGETS_QUERY = graphql(`
	query GetBudgets(
		$limit: Int!
		$start_at: timestamptz!
		$end_at: timestamptz!
	) {
		budget(order_by: { priority: asc }, limit: $limit) {
			budget_months {
				amount
				month {
					start_at
					end_at
				}
			}
			id
			label
			priority
			icon
			transactions(
				order_by: { date: desc }
				where: { date: { _gte: $start_at, _lte: $end_at } }
			) {
				amount
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
				date
				transaction_type
				created_at
				updated_at
				id
				user_id
			}
		}
	}
`);

export const useGetBudgets = (
	limit: number,
	start_at: string,
	end_at: string
) => {
	return useQuery({
		queryKey: [QUERIES.MONTH_BUDGETS],
		enabled: !!start_at && !!end_at,
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number; start_at: string; end_at: string }
			>(GET_BUDGETS_QUERY, { limit, start_at, end_at });
		},
	});
};
