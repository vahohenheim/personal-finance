import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { Company } from '../../gql/graphql';
import { QUERIES } from '../constants';

const GET_COMPANY_QUERY = graphql(`
	query GetCompany($id: uuid!) {
		company(where: { id: { _eq: $id } }) {
			id
			label
			logo
			transactions(order_by: { date: desc }) {
				amount
				company {
					label
					logo
				}
				budget {
					label
					icon
					budget_type {
						color
					}
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

export const useGetCompany = (id: string) => {
	return useQuery({
		queryKey: [QUERIES.COMPANY(id)],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<
				{ company: Array<Company> },
				{ id: string }
			>(GET_COMPANY_QUERY, {
				id,
			});
		},
	});
};
