import { Chest } from '../item/item.model';

export type ListChestComponentProps = {
	chests: Array<Chest> | undefined;
	loading: boolean;
};
