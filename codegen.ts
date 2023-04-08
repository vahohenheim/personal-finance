import { CodegenConfig } from '@graphql-codegen/cli';

const NHOST_HASURA_GRAPHQL_API =
	process.env.REACT_APP_NHOST_HASURA_GRAPHQL_API || '';
const NHOST_HASURA_ADMIN_SECRET =
	process.env.REACT_APP_NHOST_HASURA_ADMIN_SECRET || '';

const config: CodegenConfig = {
	schema: [
		{
			[NHOST_HASURA_GRAPHQL_API]: {
				headers: {
					'x-hasura-admin-secret': NHOST_HASURA_ADMIN_SECRET,
				},
			},
		},
	],
	ignoreNoDocuments: true,
	generates: {
		'./src/gql/': {
			documents: ['src/**/*.tsx', 'src/**/*.ts'],
			preset: 'client',
			plugins: [],
		},
	},
};

export default config;
