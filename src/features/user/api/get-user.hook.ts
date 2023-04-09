import { graphql } from '../../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../../utils/graphql-client';
import { User } from '../../../models/user';

const GET_USER_QUERY = graphql(`
	query GetUser($id: uuid!) {
		user(id: $id) {
			id
			email
			displayName
			metadata
			avatarUrl
			user_months(where: { current: { _eq: true } }) {
				month {
					start_at
				}
			}
		}
	}
`);

export const useGetUser = (id: string) => {
	return useQuery({
		queryKey: ['user'],
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
