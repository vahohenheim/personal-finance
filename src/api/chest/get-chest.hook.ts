import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Chest } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_CHEST_QUERY = graphql(`
	query GetChest($id: uuid!) {
		chest(where: { id: { _eq: $id } }) {
			id
			icon
			label
			start_at
			end_at
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
			}
		}
	}
`);

export const useGetChest = (id: string) => {
	return useQuery({
		queryKey: [QUERIES.CHEST(id)],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<{ chest: Array<Chest> }, { id: string }>(
				GET_CHEST_QUERY,
				{
					id,
				}
			);
		},
	});
};