import { Chest } from '../../../gql/graphql';
import { ListChestService } from './list.service';
import { ListChest } from './list.model';
import { ChestType } from '../../../models/chest';

export const useListChest = (chests: Array<Chest> = []): ListChest => {
	return chests.reduce(
		ListChestService.aggregateChestByProject.bind(ListChestService),
		{
			[ChestType.PROJECT]: [],
			[ChestType.BUCKET]: [],
		}
	);
};
