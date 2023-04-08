import { graphql } from '../../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../../utils/graphql-client';
import { Budget } from '../../../gql/graphql';

const GET_BUDGET_QUERY = graphql(`
	query GetBudget($id: uuid!) {
		budget(where: { id: { _eq: $id } }) {
			id
			label
			icon
			budget_type {
				color
			}
			budget_months {
				budget_id
				month_id
				amount
				month {
					start_at
					end_at
				}
			}
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
						month_id
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

export const useGetBudget = (id: string) => {
	return useQuery({
		queryKey: [`budget-${id}`],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<{ budget: Array<Budget> }, { id: string }>(
				GET_BUDGET_QUERY,
				{
					id,
				}
			);
		},
	});
};
