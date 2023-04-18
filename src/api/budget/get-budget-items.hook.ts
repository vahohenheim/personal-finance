import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Budget } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_BUDGET_ITEMS_QUERY = graphql(`
	query GetBudgetItems($limit: Int!) {
		budget(order_by: { label: asc }, limit: $limit) {
			id
			icon
			label
		}
	}
`);

export const useGetBudgetItems = () => {
	return useQuery({
		queryKey: [QUERIES.BUDGET_ITEMS],
		queryFn: async () => {
			return gqlClient.request<
				{ budget: Array<Budget> },
				{ limit: number }
			>(GET_BUDGET_ITEMS_QUERY, { limit: 100 });
		},
	});
};
