import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Company } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_COMPANY_ITEMS_QUERY = graphql(`
	query GetCompanyItems($limit: Int!) {
		company(order_by: { label: asc }, limit: $limit) {
			id
			label
			logo
		}
	}
`);

export const useGetCompanyItems = () => {
	return useQuery({
		queryKey: [QUERIES.COMPANY_ITEMS],
		queryFn: async () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ limit: number }
			>(GET_COMPANY_ITEMS_QUERY, { limit: 100 });
		},
	});
};
