import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Company } from '../../gql/graphql';

const GET_ITEM_COMPANIES_QUERY = graphql(`
	query GetItemCompanies($limit: Int!) {
		company(order_by: { label: asc }, limit: $limit) {
			id
			label
			logo
		}
	}
`);

export const useGetItemCompanies = () => {
	return useQuery({
		queryKey: ['companies'],
		queryFn: async () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ limit: number }
			>(GET_ITEM_COMPANIES_QUERY, { limit: 100 });
		},
	});
};
