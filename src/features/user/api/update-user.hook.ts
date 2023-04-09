import { graphql } from '../../../gql';
import { useMutation } from '@tanstack/react-query';
import { gqlClient } from '../../../utils/graphql-client';
import { queryClient } from '../../../utils/react-query-client';
import { User } from '../../../models/user';

const UPDATE_USER_MUTATION = graphql(`
	mutation UpdateUser(
		$id: uuid!
		$displayName: String!
		$avatarUrl: String!
		$metadata: jsonb
	) {
		updateUser(
			pk_columns: { id: $id }
			_set: {
				displayName: $displayName
				metadata: $metadata
				avatarUrl: $avatarUrl
			}
		) {
			id
			displayName
			avatarUrl
			metadata
		}
	}
`);

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: (userUpdated: Partial<User>) => {
			return gqlClient.request<Partial<User>>(
				UPDATE_USER_MUTATION,
				userUpdated
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['user']);
		},
	});
};
