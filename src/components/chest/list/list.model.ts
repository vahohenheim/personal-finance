import { Chest } from '../../../gql/graphql';

export type ListChestComponentProps = {
	chests: Array<Chest> | undefined;
	loading: boolean;
};
