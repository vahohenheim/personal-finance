import { Users } from '../gql/graphql';

export type User =
	| (Partial<Users> & {
			metadata: { firstName: string; lastName: string };
	  })
	| undefined;
