import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { BackComponent } from '../../../components/back/back';
import { FormSkeletonCompanyComponent } from '../../../components/company/form/form.skeleton';
import { useUpdateChest } from '../../../api/chest/update-chest.hook';
import { useGetChest } from '../../../api/chest/get-chest.hook';
import { FormChestValues } from '../../../components/chest/form/form.model';
import { FormChestComponent } from '../../../components/chest/form/form';
import { formatInsertableDate } from '../../../utils/format-insertable-date';

const EditChestPage = () => {
	const [form] = Form.useForm();
	const { id } = useParams();
	const navigate = useNavigate();
	const updateChest = useUpdateChest(id || '');
	const getChest = useGetChest(id || '');
	const chest = getChest.data?.chest[0];

	const onFinish = (values: FormChestValues) => {
		updateChest.mutate({
			id: chest?.id,
			icon: values.icon,
			label: values.label,
			amount: values.amount,
			start_at: formatInsertableDate(values.start_at),
			end_at: formatInsertableDate(values.end_at),
		});
	};

	if (updateChest.data) {
		toast.success('Edit chest successfully', {
			id: 'chest-edited',
		});
		navigate(-1);
	}

	if (updateChest.isError) {
		toast.error('Unable to edit chest', {
			id: 'chest-edited',
		});
		console.error(updateChest.error);
	}

	return (
		<>
			<Helmet>
				<title>edit chest | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">
						Edit a chest : {chest?.label}
					</TitleComponent>
					{getChest.isLoading ? (
						<FormSkeletonCompanyComponent />
					) : (
						<FormChestComponent
							onFinish={onFinish}
							form={form}
							chest={chest}
							submitLabel={'edit chest'}
							submitting={updateChest.isLoading}
						/>
					)}
				</SectionComponent>
			</div>
		</>
	);
};

export default EditChestPage;
