import { toast } from 'react-hot-toast';
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
import { useGetSettableTransaction } from '../../../api/transaction/get-settable-transaction.hook';
import { useUpdateTransaction } from '../../../api/transaction/update-transaction.hook';
import { formatInsertableDate } from '../../../utils/format-insertable-date';
import { useGetCompanyItems } from '../../../api/company/get-company-items.hook';
import { useGetBudgetItems } from '../../../api/budget/get-budget-items.hook';
import { FormSkeletonTransactionComponent } from '../../../components/transaction/form/form.skeleton';
import { useGetChestItems } from '../../../api/chest/get-chest-items.hook';

const EditTransactionPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { id } = useParams();
	const getSettableTransaction = useGetSettableTransaction(id || '');
	const updateTransaction = useUpdateTransaction(id || '');
	const getCompanies = useGetCompanyItems();
	const getBudgets = useGetBudgetItems();
	const getChests = useGetChestItems();
	const transaction = getSettableTransaction.data?.transaction[0];
	const companies = getCompanies?.data?.company || [];
	const budgets = getBudgets?.data?.budget || [];
	const chests = getChests?.data?.chest || [];
	const loading =
		getBudgets.isLoading ||
		getCompanies.isLoading ||
		getChests.isLoading ||
		getSettableTransaction.isLoading;

	const onFinish = (values: FormTransactionValues) => {
		updateTransaction.mutate({
			...transaction,
			...values,
			id: transaction?.id || '',
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
					{loading ? (
						<FormSkeletonTransactionComponent />
					) : (
						<FormTransactionComponent
							submitLabel={'edit transaction'}
							editing={true}
							onFinish={onFinish}
							form={form}
							budgets={budgets}
							companies={companies}
							chests={chests}
							transaction={transaction}
							submitting={updateTransaction.isLoading}
						/>
					)}
				</SectionComponent>
			</div>
		</>
	);
};

export default EditTransactionPage;
