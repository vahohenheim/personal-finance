import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { Company } from '../../gql/graphql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';
import { QUERIES } from '../constants';

const UPDATE_COMPANY_MUTATION = graphql(`
	mutation UpdateCompany($id: uuid!, $label: String!, $logo: String!) {
		update_company_by_pk(
			pk_columns: { id: $id }
			_set: { label: $label, logo: $logo }
		) {
			id
			label
			logo
		}
	}
`);

export const useUpdateCompany = (id: string) => {
	return useMutation({
		mutationFn: (updatedCompany: Partial<Company>) => {
			return gqlClient.request<Partial<Company>>(
				UPDATE_COMPANY_MUTATION,
				updatedCompany
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries([
				QUERIES.COMPANIES,
				QUERIES.COMPANY(id),
			]);
		},
	});
};
