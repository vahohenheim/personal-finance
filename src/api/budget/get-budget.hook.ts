import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Budget } from '../../gql/graphql';

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
				transaction_type
				created_at
				updated_at
				id
				user_id
			}
		}
	}
`);

/*
{
  transaction(where: {date: {_gte: "2023-04-01T00:00:00.000000+00:00", _lte: "2023-05-01T00:00:00.000000+00:00"}}) {
    date
  }
}
*/

export const useGetBudget = (id: string, start_at: string, end_at: string) => {
	return useQuery({
		queryKey: [`budget-${id}`],
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
