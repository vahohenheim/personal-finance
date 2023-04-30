import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import { BackComponent } from '../../../components/back/back';
import { useInsertChest } from '../../../api/chest/insert-chest.hook';
import { FormChestValues } from '../../../components/chest/form/form.model';
import { FormChestComponent } from '../../../components/chest/form/form';
import { formatInsertableDate } from '../../../utils/format-insertable-date';

const AddChestPage = () => {
	const userId = useUserId() as string;
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const insertChest = useInsertChest(userId);
	const onFinish = (values: FormChestValues) => {
		insertChest.mutate({
			icon: values.icon,
			label: values.label,
			amount: values.amount,
			type: values.type as string,
			start_at: formatInsertableDate(values.start_at),
			end_at: formatInsertableDate(values.end_at),
		});
	};

	if (insertChest.data) {
		toast.success('Add chest successfully', {
			id: 'chest-added',
		});
		navigate(-1);
	}

	if (insertChest.isError) {
		toast.error('Unable to add chest', {
			id: 'chest-added',
		});
		console.error(insertChest.error);
	}

	return (
		<>
			<Helmet>
				<title>add chest | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">Add a chest</TitleComponent>
					<FormChestComponent
						onFinish={onFinish}
						form={form}
						submitLabel={'add chest'}
						submitting={insertChest.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default AddChestPage;
