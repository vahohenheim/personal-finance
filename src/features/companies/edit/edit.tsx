import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import {
	FormCompanyValues,
	FormCompanyComponent,
} from '../../../components/company';
import { useUpdateCompany } from '../../../api/company/update-company.hook';
import { useGetCompany } from '../../../api/company/get-company.hook';
import { BackComponent } from '../../../components/back/back';
import { FormSkeletonCompanyComponent } from '../../../components/company/form/form.skeleton';

const EditCompanyPage = () => {
	const userId = useUserId() as string;
	const [form] = Form.useForm();
	const { id } = useParams();
	const navigate = useNavigate();
	const updateCompany = useUpdateCompany(userId);
	const getCompany = useGetCompany(id || '');
	const company = getCompany.data?.company[0];

	const onFinish = (values: FormCompanyValues) => {
		updateCompany.mutate({
			label: values.label,
			logo: values.logo,
		});
	};

	if (updateCompany.data) {
		toast.success('Edit company successfully', {
			id: 'company-edited',
		});
		navigate(-1);
	}

	if (updateCompany.isError) {
		toast.error('Unable to edit company', {
			id: 'company-edited',
		});
		console.error(updateCompany.error);
	}

	return (
		<>
			<Helmet>
				<title>edit transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">
						Edit a company : {company?.label}
					</TitleComponent>
					{getCompany.isLoading ? (
						<FormSkeletonCompanyComponent />
					) : (
						<FormCompanyComponent
							onFinish={onFinish}
							form={form}
							company={company}
							submitLabel={'edit company'}
							submitting={updateCompany.isLoading}
						/>
					)}
				</SectionComponent>
			</div>
		</>
	);
};

export default EditCompanyPage;
