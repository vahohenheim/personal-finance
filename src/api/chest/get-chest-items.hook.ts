import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Chest } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_CHEST_ITEMS_QUERY = graphql(`
	query GetChestItems($limit: Int!) {
		chest(order_by: { label: asc }, limit: $limit) {
			id
			icon
			label
            type
		}
	}
`);

export const useGetChestItems = () => {
	return useQuery({
		queryKey: [QUERIES.CHEST_ITEMS],
		queryFn: async () => {
			return gqlClient.request<
				{ chest: Array<Chest> },
				{ limit: number }
			>(GET_CHEST_ITEMS_QUERY, { limit: 100 });
		},
	});
};
