import { Chest } from '../../gql/graphql';

export type PatrimonyComponentProps = {
	chests: Array<Chest>;
	loading: boolean;
};
