import type { Chest } from '../../../gql/graphql';
import type { ChestType } from '../../../models/chest';

export type ListChestComponentProps = {
	chests: Array<Chest> | undefined;
	loading: boolean;
};

export type ListChest = Record<ChestType, Array<Chest>>;
