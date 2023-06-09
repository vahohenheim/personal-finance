import { graphql } from '../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../utils/graphql-client';
import { User } from '../../models/user';
import { QUERIES } from '../constants';

const GET_USER_QUERY = graphql(`
	query GetUser($id: uuid!) {
		user(id: $id) {
			id
			email
			displayName
			metadata
			avatarUrl
			user_months(where: { current: { _eq: true } }) {
				month_id
				month {
					start_at
					end_at
				}
			}
		}
	}
`);

export const useGetUser = (id: string) => {
	return useQuery({
		queryKey: [QUERIES.USER],
		enabled: !!id,
		queryFn: () => {
			return gqlClient.request<{ user: User }, { id: string }>(
				GET_USER_QUERY,
				{
					id,
				}
			);
		},
	});
};
