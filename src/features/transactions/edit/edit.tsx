import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';
import {
	FormTransactionComponent,
	FormTransactionValues,
} from '../../../components/transaction';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { BackComponent } from '../../../components/back/back';
import { useGetSettableTransaction } from '../api/get-settable-transaction.hook';
import { useUpdateTransaction } from '../api/update-transaction.hook';
import { formatInsertableDate } from '../../../utils/format-insertable-date';

const EditTransactionPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { id } = useParams();
	const getSettableTransaction = useGetSettableTransaction(id || '');
	const updateTransaction = useUpdateTransaction(id || '');
	const transaction = getSettableTransaction.data?.transaction[0];

	const onFinish = (values: FormTransactionValues) => {
		updateTransaction.mutate({
			id: transaction?.id || '',
			label: values.label || '',
			amount: values.amount,
			transaction_type: values.transaction_type || '',
			company_id: values.company_id,
			budget_id: values.budget_id || null,
			date: formatInsertableDate(values.date),
		});
	};

	if (updateTransaction.data) {
		toast.success('Edit transaction successfully', {
			id: 'transaction-edited',
		});
		navigate(-1);
	}

	if (updateTransaction.isError) {
		toast.error('Unable to edit transaction', {
			id: 'transaction-edited',
		});
		console.error(updateTransaction.error);
	}

	if (getSettableTransaction.isLoading) {
		return <div>Loading...</div>;
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
						Edit a transaction : {transaction?.label}
					</TitleComponent>
					<FormTransactionComponent
						submitLabel={'edit transaction'}
						onFinish={onFinish}
						form={form}
						transaction={transaction}
						loading={updateTransaction.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default EditTransactionPage;
