import { ChestType } from '../../../models/chest';
import { ListChest } from './list.model';
import { Chest } from '../../../gql/graphql';

export class ListChestService {
	public static aggregateChestByProject(
		acc: ListChest,
		chest: Chest
	): ListChest {
		acc[chest.type as ChestType].push(chest);
		return acc;
	}
}
