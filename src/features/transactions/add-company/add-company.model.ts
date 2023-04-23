import { UseQueryResult } from '@tanstack/react-query/src/types';
import { Company } from '../../../gql/graphql';

export type AddCompanyTransactionProps = {
	open: boolean;
	requestCompany: string;
	userId: string;
	getCompanies: UseQueryResult<{ company: Array<Company> }>;
	onSuccess: () => void;
};
