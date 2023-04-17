import { Chest } from '../item/item.model';

export type TotalChestsComponentProps = {
	chests: Array<Chest> | undefined;
	loading: boolean;
};
