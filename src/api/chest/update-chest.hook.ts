import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { Chest } from '../../gql/graphql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import { QUERIES } from '../constants';

const UPDATE_CHEST_MUTATION = graphql(`
	mutation UpdateChest(
		$id: uuid!
		$icon: String!
		$label: String!
		$type: String!
		$amount: float8!
		$start_at: timestamptz!
		$end_at: timestamptz!
	) {
		update_chest_by_pk(
			pk_columns: { id: $id }
			_set: {
				label: $label
				icon: $icon
				type: $type
				amount: $amount
				start_at: $start_at
				end_at: $end_at
			}
		) {
			id
			icon
			label
			type
			amount
			start_at
			end_at
		}
	}
`);

export const useUpdateChest = (id: string) => {
	return useMutation({
		mutationFn: (updatedChest: Partial<Chest>) => {
			return gqlClient.request<Partial<Chest>>(
				UPDATE_CHEST_MUTATION,
				updatedChest
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				QUERIES.CHESTS,
				QUERIES.CHEST(id),
				QUERIES.CHEST_ITEMS,
			]);
		},
	});
};
