import { graphql } from '../../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../../utils/graphql-client';
import { Company } from '../../../gql/graphql';

const GET_COMPANIES_QUERY = graphql(`
	query GetCompanies($limit: Int!) {
		company(order_by: { created_at: desc }, limit: $limit) {
			id
			label
			logo
		}
	}
`);

export const useGetCompanies = () => {
	return useQuery({
		queryKey: ['companies'],
		queryFn: async () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ limit: number }
			>(GET_COMPANIES_QUERY, { limit: 100 });
		},
	});
};
