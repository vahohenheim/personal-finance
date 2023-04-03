import { useMutation } from '@tanstack/react-query';
import { graphql } from '../../../gql/gql';
import { gqlClient } from '../../../utils/graphql-client';
import { queryClient } from '../../../utils/react-query-client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import type { Company_Insert_Input } from '../../../gql/graphql';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import { FormCompanyValues } from '../components/form/form.model';
import FormCompanyComponent from '../components/form/form';

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

const AddCompanyPage = () => {
	const id = useUserId() as string;
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const insertCompany = useMutation({
		mutationFn: (company: Company_Insert_Input) => {
			return gqlClient.request(INSERT_COMPANY_MUTATION, {
				company: {
					label: company.label,
					logo: company.logo,
					user_id: id,
				},
			});
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(['companies']);
		},
	});

	const onFinish = (values: FormCompanyValues) => {
		try {
			const company: Company_Insert_Input = {
				label: values.label,
				logo: values.logo,
			};
			insertCompany.mutate(company);
			toast.success('Add company successfully', {
				id: 'company-added',
			});
			form.resetFields();
			navigate(-1);
		} catch (error) {
			toast.error('Unable to add company', {
				id: 'company-added',
			});
			console.error(error);
		}
	};

	return (
		<>
			<Helmet>
				<title>add transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<TitleComponent heading="h2">Add a company</TitleComponent>
					<FormCompanyComponent onFinish={onFinish} form={form} />
				</SectionComponent>
			</div>
		</>
	);
};

export default AddCompanyPage;
