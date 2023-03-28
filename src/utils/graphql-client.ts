import { nhost } from './nhost';
import { GraphQLClient } from 'graphql-request';

type AuthHeaderProps = {
	authorization?: string;
};

export const gqlClient = new GraphQLClient(nhost.graphql.getUrl(), {
	headers: () => {
		const authHeaders = {} as AuthHeaderProps;

		if (nhost.auth.isAuthenticated()) {
			const token = nhost.auth.getAccessToken() || '';
			authHeaders.authorization = `Bearer ${token}`;
		}

		return {
			'Content-Type': 'application/json',
			...authHeaders,
		};
	},
});
