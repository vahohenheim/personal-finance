import { graphql } from '../../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../../utils/graphql-client';
import { Budget } from '../../../gql/graphql';

const GET_BUDGETS_QUERY = graphql(`
	query GetMonthBudgets($limit: Int!) {
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
			transactions(order_by: { date: desc }) {
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
				transaction_type
				created_at
				updated_at
				id
				user_id
			}
		}
	}
`);

export const useGetBudgets = (limit: number) => {
	return useQuery({
		queryKey: ['month-budgets'],
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number }
			>(GET_BUDGETS_QUERY, { limit });
		},
	});
};
