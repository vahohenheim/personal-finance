import { graphql } from '../../gql';
import { useMutation } from '@tanstack/react-query';
import { Company_Insert_Input } from '../../gql/graphql';
import { gqlClient } from '../../utils/graphql-client';
import { queryClient } from '../../utils/react-query-client';

const INSERT_COMPANY_MUTATION = graphql(`
	mutation InsertCompany($company: company_insert_input!) {
		insert_company(objects: [$company]) {
			affected_rows
			returning {
				id
				label
				logo
			}
		}
	}
`);

export const useInsertCompany = (userId: string) => {
	return useMutation({
		mutationFn: (company: Company_Insert_Input) => {
			return gqlClient.request(INSERT_COMPANY_MUTATION, {
				company: {
					label: company.label,
					logo: company.logo,
					user_id: userId,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['companies']);
		},
	});
};
