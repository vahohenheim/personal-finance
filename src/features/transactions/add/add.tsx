import { toast } from 'react-hot-toast';
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
import { useGetItemCompanies } from '../api/get-item-companies.hook';
import { useGetItemBudgets } from '../api/get-item-budgets.hook';
import { FormSkeletonTransactionComponent } from '../../../components/transaction/form/form.skeleton';

const AddTransactionPage = () => {
	const userId = useUserId() as string;
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const insertTransaction = useInsertTransaction(userId);
	const getCompanies = useGetItemCompanies();
	const getBudgets = useGetItemBudgets();
	const companies = getCompanies?.data?.company || [];
	const budgets = getBudgets?.data?.budget || [];
	const loading = getBudgets.isLoading || getCompanies.isLoading;

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
				<title>add transaction | finance</title>
			</Helmet>
			<div className="container center-block">
				<SectionComponent>
					<BackComponent />
					<TitleComponent heading="h2">
						Add a transaction
					</TitleComponent>
					{loading ? (
						<FormSkeletonTransactionComponent />
					) : (
						<FormTransactionComponent
							submitLabel={'add transaction'}
							onFinish={onFinish}
							form={form}
							budgets={budgets}
							companies={companies}
							transaction={{
								transaction_type: TransactionType.SPENT,
								budget_type: 'month',
								date: dayjs(),
							}}
							submitting={insertTransaction.isLoading}
						/>
					)}
				</SectionComponent>
			</div>
		</>
	);
};

export default AddTransactionPage;
