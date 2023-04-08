import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import {
	FormTransactionComponent,
	FormTransactionValues,
} from '../../../components/transaction';
import { Helmet } from 'react-helmet';
import SectionComponent from '../../../components/section/section';
import TitleComponent from '../../../components/title/title';
import { useUserId } from '@nhost/react';
import dayjs from 'dayjs';
import { TransactionType } from '../../../models/transaction';
import { BackComponent } from '../../../components/back/back';
import { useInsertTransaction } from '../api/insert-transaction.hook';

const AddTransactionPage = () => {
	const userId = useUserId() as string;
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const insertTransaction = useInsertTransaction(userId);

	const onFinish = (values: FormTransactionValues) => {
		insertTransaction.mutate({
			label: values.label,
			amount: values.amount,
			transaction_type: values.transaction_type,
			company_id: values.company_id,
			budget_id: values.budget_id,
		});
	};

	if (insertTransaction.data) {
		toast.success('Add transaction successfully', {
			id: 'transaction-added',
		});
		navigate(-1);
	}

	if (insertTransaction.isError) {
		toast.error('Unable to add transaction', {
			id: 'transaction-added',
		});
		console.error(insertTransaction.error);
	}

	return (
		<>
			<Helmet>
				<title>add transation | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">
						Add a transaction
					</TitleComponent>
					<FormTransactionComponent
						submitLabel={'add transaction'}
						onFinish={onFinish}
						form={form}
						transaction={{
							transaction_type: TransactionType.SPENT,
							budget_type: 'month',
							date: dayjs(),
						}}
						loading={insertTransaction.isLoading}
					/>
				</SectionComponent>
			</div>
		</>
	);
};

export default AddTransactionPage;
