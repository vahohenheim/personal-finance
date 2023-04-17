import { Transaction } from '../../../gql/graphql';

export type ItemChestComponentProps = {
	chest: Chest;
};

export type Chest = {
	id: string;
	icon: string;
	label: string;
	amount?: number;
	transactions: Array<Partial<Transaction>>;
};
