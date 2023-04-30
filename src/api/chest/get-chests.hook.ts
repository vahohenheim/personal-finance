import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { QUERIES } from '../constants';
import { Chest } from '../../gql/graphql';

const GET_CHESTS_QUERY = graphql(`
	query GetChests($limit: Int!) {
		chest(order_by: { start_at: asc }, limit: $limit) {
			id
			icon
			label
			amount
			start_at
			end_at
			type
			transactions(order_by: { date: desc }) {
				amount
				transaction_type
			}
		}
	}
`);

export const useGetChests = (limit: number) => {
	return useQuery({
		queryKey: [QUERIES.CHESTS],
		queryFn: async () => {
			return gqlClient.request<
				{ chest: Array<Chest> },
				{ limit: number }
			>(GET_CHESTS_QUERY, { limit });
		},
	});
};
