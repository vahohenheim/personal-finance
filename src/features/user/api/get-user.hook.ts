import { graphql } from '../../../gql';
import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../../../utils/graphql-client';
import { User } from '../../../user.model';

const GET_USER_QUERY = graphql(`
	query GetUser($id: uuid!) {
		user(id: $id) {
			id
			email
			displayName
			metadata
			avatarUrl
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
