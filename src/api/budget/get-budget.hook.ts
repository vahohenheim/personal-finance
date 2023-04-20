import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Budget } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_BUDGET_QUERY = graphql(`
	query GetBudget(
		$id: uuid!
		$start_at: timestamptz!
		$end_at: timestamptz!
	) {
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
						month_id
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

export const useGetBudget = (id: string, start_at: string, end_at: string) => {
	return useQuery({
		queryKey: [QUERIES.BUDGET(id)],
		enabled: !!id && !!start_at && !!end_at,
		queryFn: () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ id: string; start_at: string; end_at: string }
			>(GET_BUDGET_QUERY, {
				id,
				start_at,
				end_at,
			});
		},
	});
};
