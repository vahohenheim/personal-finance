import { Company } from '../../../gql/graphql';

export type ListCompaniesComponentProps = {
	companies: Array<Company> | undefined;
	loading: boolean;
};
