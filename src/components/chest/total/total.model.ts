import { Chest } from '../../../gql/graphql';

export type TotalChestsComponentProps = {
	chests: Array<Chest> | undefined;
	loading: boolean;
};
