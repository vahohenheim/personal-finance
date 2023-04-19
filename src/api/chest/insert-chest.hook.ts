import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { Chest_Insert_Input } from '../../gql/graphql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import { QUERIES } from '../constants';

const INSERT_CHEST_MUTATION = graphql(`
	mutation InsertChest($chest: chest_insert_input!) {
		insert_chest(objects: [$chest]) {
			affected_rows
			returning {
				id
				icon
				label
				amount
				start_at
				end_at
			}
		}
	}
`);

export const useInsertChest = (userId: string) => {
	return useMutation({
		mutationFn: (chest: Chest_Insert_Input) => {
			return gqlClient.request(INSERT_CHEST_MUTATION, {
				chest: {
					icon: chest.icon,
					label: chest.label,
					amount: chest.amount,
					start_at: chest.start_at,
					end_at: chest.end_at,
					user_id: userId,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				QUERIES.CHESTS,
				QUERIES.CHEST_ITEMS,
			]);
		},
	});
};
