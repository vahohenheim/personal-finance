import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import {
	FormCompanyValues,
	FormCompanyComponent,
} from '../../../components/company';
import { useInsertCompany } from '../api/insert-company.hook';
import { BackComponent } from '../../../components/back/back';

const AddCompanyPage = () => {
	const userId = useUserId() as string;
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const insertCompany = useInsertCompany(userId);

	const onFinish = (values: FormCompanyValues) => {
		insertCompany.mutate({
			label: values.label,
			logo: values.logo,
		});
	};

	if (insertCompany.data) {
		toast.success('Add company successfully', {
			id: 'company-added',
		});
		navigate(-1);
	}

	if (insertCompany.isError) {
		toast.error('Unable to add company', {
			id: 'company-added',
		});
		console.error(insertCompany.error);
	}

	return (
		<>
			<Helmet>
				<title>add transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">Add a company</TitleComponent>
					<FormCompanyComponent
						onFinish={onFinish}
						form={form}
						submitLabel={'add company'}
						submitting={insertCompany.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default AddCompanyPage;
