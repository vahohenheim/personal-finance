import { graphql } from '../../../gql';
import { useMutation } from '@tanstack/react-query';
import { Users_Set_Input } from '../../../gql/graphql';
import { gqlClient } from '../../../utils/graphql-client';
import { queryClient } from '../../../utils/react-query-client';

const UPDATE_USER_MUTATION = graphql(`
	mutation UpdateUser($id: uuid!, $displayName: String!, $metadata: jsonb) {
		updateUser(
			pk_columns: { id: $id }
			_set: { displayName: $displayName, metadata: $metadata }
		) {
			id
			displayName
			metadata
		}
	}
`);

export const useUpdateUser = () => {
	return useMutation({
		mutationFn: (userUpdated: Users_Set_Input) => {
			return gqlClient.request(UPDATE_USER_MUTATION, {
				id: userUpdated.id,
				displayName: userUpdated.displayName || '',
				metadata: userUpdated.metadata,
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['user']);
		},
	});
};
