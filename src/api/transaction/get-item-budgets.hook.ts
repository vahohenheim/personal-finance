import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Budget } from '../../gql/graphql';

const GET_ITEM_BUDGETS_QUERY = graphql(`
	query GetItemBudgets($limit: Int!) {
		budget(order_by: { label: asc }, limit: $limit) {
			id
			label
			icon
		}
	}
`);

export const useGetItemBudgets = () => {
	return useQuery({
		queryKey: ['budgets'],
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number }
			>(GET_ITEM_BUDGETS_QUERY, { limit: 100 });
		},
	});
};
